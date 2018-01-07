import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Drawer from 'material-ui/Drawer';
import {zIndex} from 'material-ui/styles';

import MenuItemCustom from './menu.item.component';

class MenuComponent extends Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired
  };

  render() {
    return (
      <div>
        <Drawer containerStyle={{zIndex: zIndex.drawer - 300, paddingTop: 64, width: 200}} open={this.props.visible}>
          <MenuItemCustom title='Dashboard' path='/dashboard'/>
          <MenuItemCustom title='Tournaments' path='/tournaments'/>
          <MenuItemCustom title='Clubs' path='/clubs'/>
        </Drawer>
      </div>);
  }
}

export default MenuComponent;
