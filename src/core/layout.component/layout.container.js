import {connect} from 'react-redux';
import CoreLayout from './layout.component';
import {logout} from '../../routes/login/login.module';
import {changeDrawerState, changeSnackBarMessage} from './layout.module';

const mapStateToProps = state => ({auth: state.login.auth, ...state.layout});
const mapDispatchToProps = {
  logout,
  changeDrawerState,
  changeSnackBarMessage
};

export default connect(mapStateToProps, mapDispatchToProps)(CoreLayout);
