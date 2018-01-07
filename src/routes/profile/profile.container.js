import {connect} from 'react-redux';

import {getMeInfo, changeName} from './profile.module';
import {changeEmail, changePassword} from './profile.modal.module';
import ProfileComponent from './profile.component';

const mapStateToProps = state => ({...state.profile});
const mapDispatchToProps = {
  getMeInfo,
  changeName,
  changeEmail,
  changePassword
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileComponent);
