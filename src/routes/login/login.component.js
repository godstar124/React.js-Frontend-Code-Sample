import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {browserHistory} from 'react-router';

import LoginForm from './login.form';
import './login.component.scss';

class LoginComponent extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    if (this.props.auth) {
      browserHistory.push('/dashboard');
    }
  }

  componentDidUpdate() {
    if (this.props.auth) {
      browserHistory.push('/dashboard');
    }
  }

  static propTypes = {
    loginDispatch: PropTypes.func.isRequired,
    auth: PropTypes.bool.isRequired,
    fetching: PropTypes.bool.isRequired
  };

  handleSubmit(credentials) {
    this.props.loginDispatch(credentials);
  }

  render() {
    return (
      <div className='login-wrapper'>
        <div className='login-container'>
          <h1>Football</h1>
          <LoginForm onSubmit={::this.handleSubmit} fetching={this.props.fetching}/>
        </div>
      </div>);
  }
}

export default LoginComponent;
