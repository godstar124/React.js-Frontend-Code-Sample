import React, {Component} from 'react';
import PropTypes from 'prop-types';

import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';

import Utils from '../../shared/utils';
import ClubsModel from './clubs.modal';
import SimpleTable from '../../shared/wrapper/simpleTable';

import './tournament-details.component.scss';

class TournamentDetailsComponent extends Component {
  constructor(props) {
    super(props);
  }

  static PropTypes = {
    tournament: PropTypes.object.isRequired,
    fetching: PropTypes.bool.isRequired,
    getTournamentDetails: PropTypes.func.isRequired,
    addClubToTournament: PropTypes.func.isRequired,
    leave: PropTypes.func.isRequired,
    changeClubModalVisible: PropTypes.func.isRequired,
    clubModalOpen: PropTypes.bool.isRequired,
    clubs: PropTypes.array.isRequired
  };

  componentDidMount() {
    if (!Object.keys(this.props.tournament).length) {
      this.props.getTournamentDetails(+this.props.params.id);
    }
  }

  changeClubModal(stateModal, needLoad = false) {
    this.props.changeClubModalVisible(stateModal,
      needLoad ? this.props.tournament.id : null);
  }

  selectedClub(id) {
    this.props.addClubToTournament(this.props.tournament.id, id);
  }

  leave() {
    this.props.leave(this.props.tournament.id);
  }

  render() {
    const {fetching, tournament, clubModalOpen, clubs} = this.props;

    if (fetching) {
      return (<div className='center-child-block'>
        <CircularProgress size={60} thickness={7}/>
      </div>);
    }
    const startDate = `State date: ${tournament.startDate ? Utils.timeConverter(tournament.startDate) : 'Don\'t selected.'}`;
    const stopDate = `Stop date: ${tournament.stopDate ? Utils.timeConverter(tournament.stopDate) : 'Don\'t selected.'}`;

    let teamsTable;
    if (tournament.teams && tournament.teams.length > 0) {
      teamsTable = <SimpleTable
        columns={['ID', 'Club ID', 'User ID', 'Draws', 'Loses', 'Missed', 'Points', 'Scored', 'Wins']}
        rowKeys={['id', 'clubId', 'userId', 'draws', 'loses', 'missed', 'points', 'scored', 'wins']}
        rows={tournament.teams}
      />;
    }

    let matchTable;
    if (tournament.matches && tournament.matches.length > 0) {
      matchTable = <SimpleTable
        columns={['ID', 'Club ID', 'Home user ID', 'Away user ID', 'Home scored', 'Away scored']}
        rowKeys={['id', 'homeId', 'awayId', 'homeScored', 'awayScored']}
        rows={tournament.matches}
      />;
    }

    return (<div className='tournament-details-container'>
      <div className='action-button'>
        {tournament.isJoined ?
          <RaisedButton label='Leave' primary={true} onClick={::this.leave}/> :
          <RaisedButton label='Join' primary={true} onClick={this.changeClubModal.bind(this, true, true)}/>}
      </div>
      <div className='state'>
        <List>
          <ListItem primaryText={startDate}/>
          <ListItem primaryText={stopDate}/>
        </List>
      </div>
      <div className='teams-table'>
        {teamsTable || <lable>Teams is empty.</lable>}
      </div>
      <div className='match-table'>
        {matchTable || <lable>Matches is empty.</lable>}
      </div>
      <ClubsModel open={clubModalOpen} changeModal={this.changeClubModal.bind(this, false)}
                  selectedClub={::this.selectedClub} clubs={clubs}/>
    </div>);
  }
}

export default TournamentDetailsComponent;
