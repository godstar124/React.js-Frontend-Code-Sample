import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Field, reduxForm} from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';

import {inputRender} from '../../shared/wrapper/form-element';

class RegistrationForm extends Component {
  static propTypes = {
    fetching: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired
  };

  static validate(values) {
    const errors = {};
    if (!values.name) {
      errors.name = 'Required';
    } else if (values.name.length > 15) {
      errors.name = 'Must be 15 characters or less';
    }

    if (!values.email) {
      errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }

    if (values.password && values.confirmPassword && values.password !== values.confirmPassword) {
      errors.confirmPassword = 'Passwords must be equals.';
    }
    return errors;
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <div>
          <Field
            name='name'
            component={inputRender}
            mProps={{
              hintText: 'Name',
              floatingLabelText: 'Name'
            }}
          />
        </div>
        <div>
          <Field
            name='email'
            component={inputRender}
            mProps={{
              hintText: 'Email',
              floatingLabelText: 'Email'
            }}
          />
        </div>
        <div>
          <Field
            name='password'
            component={inputRender}
            mProps={{
              hintText: 'Password',
              floatingLabelText: 'Password',
              type: 'password'
            }}
          />
        </div>
        <div>
          <Field
            name='confirmPassword'
            component={inputRender}
            mProps={{
              hintText: 'Confirm password',
              floatingLabelText: 'Confirm password',
              type: 'password'
            }}
          />
        </div>
        <div className='center-block'>
          {this.props.fetching ? <CircularProgress size={40} thickness={7}/> :
            <RaisedButton label='Submit' primary={true} type='submit'/>}
        </div>
      </form>);
  }
}

export default reduxForm({
  form: 'registration',
  validate: RegistrationForm.validate
})(RegistrationForm);
