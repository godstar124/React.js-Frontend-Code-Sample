import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Snackbar from 'material-ui/Snackbar';

export default class MySnackbar extends Component {
  constructor(props) {
    super(props);
  }

  static PropTypes = {
    message: PropTypes.string.isRequired,
    handleClose: PropTypes.func.isRequired
  };

  handleClose() {
    this.props.handleClose();
  }

  render() {
    const {message} = this.props;
    return (
      <div>
        <Snackbar
          open={!!message}
          message={message}
          autoHideDuration={4000}
          onRequestClose={::this.handleClose}
        />
      </div>
    );
  }
}
