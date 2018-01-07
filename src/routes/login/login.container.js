import {connect} from 'react-redux';

import {loginDispatch} from './login.module';
import LoginComponent from './login.component';

const mapStateToProps = state => ({...state.login});
const mapDispatchToProps = {
  loginDispatch
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
