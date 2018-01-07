import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CircularProgress from 'material-ui/CircularProgress';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

import ProfileForm from './profile.form';
import SimpleModal from '../../shared/wrapper/simpleModal';

import './profile.component.scss';

class ProfileComponent extends Component {
  constructor(props) {
    super(props);
  }

  static PropTypes = {
    user: PropTypes.object.isRequired,
    fetching: PropTypes.bool.isRequired,
    getUser: PropTypes.func.isRequired,
    changeName: PropTypes.func.isRequired,
    changePassword: PropTypes.func.isRequired,
    changeEmail: PropTypes.func.isRequired
  };

  state = {
    openModal: false,
    emailModalOpened: false,
    passwordModalOpened: false
  };

  emailFields = [
    {type: 'email', hint: 'New email', key: 'email'},
    {type: 'password', hint: 'You password', key: 'pass'}
  ];

  passwordFields = [
    {type: 'password', hint: 'Old password', key: 'opass'},
    {type: 'password', hint: 'New password', key: 'npass'}
  ];

  componentDidMount() {
    if (Object.keys(this.props.user).length === 0) {
      this.props.getMeInfo();
    }
  }

  changeEmailModal(state) {
    this.setState({
      emailModalOpened: state
    });
  }

  changePasswordModal(state) {
    this.setState({
      passwordModalOpened: state
    });
  }

  handlerPassword({npass, opass}) {
    this.props.changePassword(opass, npass);
  }

  handlerEmail({email, pass}) {
    this.props.changeEmail(email, pass);
  }

  handlerForm(data) {
    this.props.changeName(data.name);
  }

  render() {
    const {fetching, user} = this.props;

    if (fetching) {
      return (<div className='center-child-block'>
        <CircularProgress size={60} thickness={7} />
      </div>);
    }

    return (
      <div className='center-child-block'>
        <div className='profile-container'>
          <div className='profile-container-form'>
            <ProfileForm
              onSubmit={::this.handlerForm}
              name={user.name || ''}
              email={user.email || ''}
            />
          </div>
          <div>
            <Paper zDepth={2} style={{padding: 20, display: 'flex', justifyContent: 'center'}}>
              <RaisedButton
                label='Change email'
                secondary={true}
                onClick={this.changeEmailModal.bind(this, true)}
              />
              <RaisedButton
                className='button-change-password'
                label='Change password'
                secondary={true}
                onClick={this.changePasswordModal.bind(this, true)}
              />
            </Paper>
          </div>
        </div>
        <SimpleModal
          open={this.state.emailModalOpened}
          handler={::this.handlerEmail}
          changeModal={::this.changeEmailModal}
          inputs={this.emailFields}
        />
        <SimpleModal
          open={this.state.passwordModalOpened}
          handler={::this.handlerPassword}
          changeModal={::this.changePasswordModal}
          inputs={this.passwordFields}
        />
      </div>);
  }
}

export default ProfileComponent;
