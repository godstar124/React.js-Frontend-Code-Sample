import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Header from '../header.component/header.component';
import MenuComponent from '../menu.component/menu.component';
import MySnackBar from '../snackbar.component/snackbar.component';
import './layout.component.scss';

class CoreLayout extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    children: PropTypes.element.isRequired,
    auth: PropTypes.bool.isRequired,
    drawerState: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired,
    changeDrawerState: PropTypes.func.isRequired,
    snackMessage: PropTypes.string.isRequired,
    changeSnackBarMessage: PropTypes.func.isRequired
  };

  render() {
    const {auth, drawerState, changeDrawerState, logout, children, snackMessage, changeSnackBarMessage} = this.props;
    let header;
    let mainClass;
    if (auth) {
      if (drawerState) {
        mainClass = 'main-container';
      }
      header = <Header logout={logout} changeDrawerState={changeDrawerState}/>;
    }

    return (
      <div>
        <header>
          {header}
        </header>
        <MenuComponent visible={drawerState}/>
        <main className={mainClass}>
          {children}
        </main>
        <MySnackBar message={snackMessage} handleClose={changeSnackBarMessage.bind(this, '')}/>
      </div>);
  }
}

export default CoreLayout;
