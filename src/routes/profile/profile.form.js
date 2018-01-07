import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Field, reduxForm} from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

import {inputRender} from '../../shared/wrapper/form-element';

class ProfileForm extends Component {
  static propTypes = {
    fetching: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired
  };

  static validate(values) {
    const errors = {};
    if (!values.name) {
      errors.name = 'Required';
    } else if (values.name.length > 15) {
      errors.name = 'Must be 15 characters or less';
    }

    return errors;
  }

  render() {
    const {name, email, handleSubmit} = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <Paper zDepth={2} style={{padding: 20}}>
            <Field
              name='name'
              component={inputRender}
              mProps={{
                hintText: 'Name',
                floatingLabelText: 'Name',
                fullWidth: true,
                defaultValue: name
              }}
            />
            <Field
              name='email'
              component={inputRender}
              mProps={{
                hintText: 'Email',
                floatingLabelText: 'Email',
                disabled: true,
                fullWidth: true,
                value: email
              }}
            />
            <div className='center-child-block'>
                <RaisedButton label='Save' primary={true} type='submit'/>
            </div>
          </Paper>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'profile',
  validate: ProfileForm.validate
})(ProfileForm);
