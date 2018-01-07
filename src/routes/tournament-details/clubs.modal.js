import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

export default class ClubsModal extends Component {
  static PropTypes = {
    open: PropTypes.bool.isRequired,
    changeModal: PropTypes.func.isRequired,
    selectedClub: PropTypes.func.isRequired,
    clubs: PropTypes.array.isRequired
  };

  state = {
    club: null
  };

  selectedClub() {
    this.setState({club: null});
    this.props.selectedClub(this.state.club);
  }

  closeModal() {
    this.setState({club: null});
    this.props.changeModal(false);
  }

  handleChange(event, index, club) {
    this.setState({club});
  }

  render() {
    const {open, clubs} = this.props;
    const actions = [
      <FlatButton
        key='1'
        label='Cancel'
        primary={true}
        onTouchTap={::this.closeModal}
      />,
      <FlatButton
        key='2'
        label='Submit'
        primary={true}
        keyboardFocused={true}
        onTouchTap={::this.selectedClub}
      />
    ];

    return (
      <div>
        <Dialog
          title='Clubs list'
          actions={actions}
          modal={false}
          open={open}
          onRequestClose={::this.closeModal}
        >
          <SelectField
            floatingLabelText='Select club'
            onChange={::this.handleChange}
            value={this.state.club}
          >
            {clubs.map((el) => (<MenuItem value={el.id} key={el.id} primaryText={el.title}/>))}
          </SelectField>
        </Dialog>
      </div>
    );
  }
}