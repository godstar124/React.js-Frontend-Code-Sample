import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import PropTypes from 'prop-types';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

class Header extends Component {
  static propTypes = {
    logout: PropTypes.func.isRequired,
    changeDrawerState: PropTypes.func.isRequired
  };

  logout() {
    this.props.logout();
    this.props.changeDrawerState(false);
    browserHistory.push('/');
  }

  changeDrawerState() {
    this.props.changeDrawerState();
  }

  goToPage(path) {
    return () => {
      browserHistory.push(path);
    };
  }

  render() {
    return (
      <div>
        <AppBar
          title="Football"
          onLeftIconButtonTouchTap={::this.changeDrawerState}
          iconElementRight={
            <IconMenu
              iconButtonElement={<IconButton><MoreVertIcon/></IconButton>}
              targetOrigin={{horizontal: 'right', vertical: 'top'}}
              anchorOrigin={{horizontal: 'right', vertical: 'top'}}>
              <MenuItem primaryText="Profile" onClick={this.goToPage('/profile')}/>
              <MenuItem primaryText="Sign out" onClick={::this.logout}/>
            </IconMenu>}
        />
      </div>
    );
  }
}

export default Header;
