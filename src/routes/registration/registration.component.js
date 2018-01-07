import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {browserHistory} from 'react-router';

import RegistrationForm from './registration.form';
import './registration.component.scss';

class RegistrationComponent extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    registrationDispatch: PropTypes.func.isRequired,
    fetching: PropTypes.bool.isRequired,
    auth: PropTypes.bool.isRequired
  };

  componentDidUpdate() {
    if (this.props.auth) {
      browserHistory.push('/dashboard');
    }
  }

  handleSubmit(data) {
    this.props.registrationDispatch(data);
  }

  render() {
    return (
      <div className='registration-wrapper'>
        <div className='registration-container'>
          <h1>Registration</h1>
          <RegistrationForm onSubmit={::this.handleSubmit}
                            fetching={this.props.fetching}/>
        </div>
      </div>);
  }
}

export default RegistrationComponent;
