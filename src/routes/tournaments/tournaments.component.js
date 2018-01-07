import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {browserHistory} from 'react-router';

import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';

class TournamentsComponent extends Component {
  constructor(props) {
    super(props);
  }

  static PropTypes = {
    tournaments: PropTypes.array.isRequired,
    fetching: PropTypes.bool.isRequired,
    getTournaments: PropTypes.func.isRequired,
    changeSnackBarMessage: PropTypes.func.isRequired
  };

  componentDidMount() {
    if (!this.props.tournaments.length) {
      this.props.getTournaments();
    }
  }

  details(id) {
    if (id) {
      return browserHistory.push(`/tournaments/${id}`);
    }
    this.changeSnackBarMessage('Server error.');
  }

  render() {
    const {fetching, tournaments} = this.props;
    if (fetching) {
      return (<div>
        <CircularProgress size={60} thickness={7} />
      </div>);
    }
    return (<div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderColumn>ID</TableHeaderColumn>
            <TableHeaderColumn>Title</TableHeaderColumn>
            <TableHeaderColumn>Games</TableHeaderColumn>
            <TableHeaderColumn>Missing</TableHeaderColumn>
            <TableHeaderColumn>Points</TableHeaderColumn>
            <TableHeaderColumn>Scored</TableHeaderColumn>
            <TableHeaderColumn>Action</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tournaments.map((el, i) => {
            return (
              <TableRow key={i}>
                <TableRowColumn>{el.id || 'data error'}</TableRowColumn>
                <TableRowColumn>{el.title || 'data error'}</TableRowColumn>
                <TableRowColumn>{el.games || 0}</TableRowColumn>
                <TableRowColumn>{el.missing || 0}</TableRowColumn>
                <TableRowColumn>{el.points || 0}</TableRowColumn>
                <TableRowColumn>{el.scored || 0}</TableRowColumn>
                <TableRowColumn>
                  <RaisedButton label='Details' disabled={!el.id} primary={true} onClick={this.details.bind(this, el.id)}/>
                </TableRowColumn>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>);
  }
}

export default TournamentsComponent;
