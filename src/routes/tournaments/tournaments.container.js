import {connect} from 'react-redux';

import {getTournaments} from './tournaments.module';
import {changeSnackBarMessage} from '../../core/layout.component/layout.module';
import TournamentsComponent from './tournaments.component';

const mapStateToProps = state => ({...state.tournaments});
const mapDispatchToProps = {
  getTournaments,
  changeSnackBarMessage
};

export default connect(mapStateToProps, mapDispatchToProps)(TournamentsComponent);
