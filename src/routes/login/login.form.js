import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Field, reduxForm} from 'redux-form';
import {browserHistory} from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import {TextField} from 'redux-form-material-ui';

class LoginForm extends Component {
  static propTypes = {
    fetching: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired
  };

  goToRegistration() {
    browserHistory.push('/registration');
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <div><Field
          name='email'
          component={TextField}
          hintText='Email'
          floatingLabelText='Email'
        /></div>
        <div>
          <Field
            name='password'
            component={TextField}
            hintText='Password'
            floatingLabelText='Password'
            type='password'
          />
         </div>
        <div className='center-child-block'>
          {this.props.fetching ? <CircularProgress size={40} thickness={7}/> :
            <RaisedButton label='Sing in' primary={true} type='submit'/>}
            <RaisedButton label='Sing up' secondary={true} onClick={this.goToRegistration}/>
        </div>
      </form>);
  }
}

export default reduxForm({
  form: 'login'
})(LoginForm);
