import React, {Component} from 'react';
import PropTypes from 'prop-types';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

class IconMenuCustom extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    elements: PropTypes.array.isRequired,
    index: PropTypes.number.isRequired
  };

  render() {
    return (
      <IconMenu
        iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
        targetOrigin={{horizontal: 'right', vertical: 'top'}}>
        {this.props.elements.map((el, i) => (<MenuItem key={i} primaryText={el.title} onClick={el.onClick.bind(null, this.props.id, this.props.index)}/>))}
      </IconMenu>);
  }
}

export default IconMenuCustom;
