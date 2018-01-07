import {connect} from 'react-redux';

import {getTournamentDetails, leave} from './tournament-details.module';
import {changeClubModalVisible, addClubToTournament} from './clubs.modal.module';
import TournamentsComponent from './tournament-details.component';

const mapStateToProps = state => ({...state.tournamentDetails});
const mapDispatchToProps = {
  getTournamentDetails,
  changeClubModalVisible,
  addClubToTournament,
  leave
};

export default connect(mapStateToProps, mapDispatchToProps)(TournamentsComponent);
