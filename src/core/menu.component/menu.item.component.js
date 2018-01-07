import React from 'react';
import PropTypes from 'prop-types';
import {browserHistory} from 'react-router';
import MenuItem from 'material-ui/MenuItem';

const MenuItemCustom = ({title, path}) => (<MenuItem onTouchTap={() => browserHistory.push(path)}>{title}</MenuItem>);

MenuItemCustom.propTypes = {
  title: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired
};

export default MenuItemCustom;
