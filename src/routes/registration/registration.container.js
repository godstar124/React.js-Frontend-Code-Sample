import {connect} from 'react-redux';

import {registrationDispatch} from './registration.module';
import RegistrationComponent from './registration.component';

const mapStateToProps = state => ({...state.registration, auth: state.login.auth});
const mapDispatchToProps = {
  registrationDispatch
};

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationComponent);
