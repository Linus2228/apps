import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';

import SideDrawer from './SideDrawer';

class Header extends Component {
  state = {
    isDrawerOpen: false,
    isHeaderShown: false
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    if (window.scrollY > 0) {
      this.setState({ isHeaderShown: true });
    } else {
      this.setState({ isHeaderShown: false });
    }
  }

  toggleDrawer = () => {
    this.setState(prevState => {
      return { isDrawerOpen: !prevState.isDrawerOpen };
    });
  }

  render() {
    const { isDrawerOpen, isHeaderShown } = this.state;
    return (
      <AppBar
        position="fixed"
        style={{
          backgroundColor: isHeaderShown ? '#2f2f2f' : 'transparent',
          boxShadow: 'none',
          padding: '10px 0px',
          flexDirection: 'row'
        }}
      >
        <Toolbar
          style={{
            flexGrow: '1'
          }}
        >
          <div className="header_logo">
            <div className="font_righteous header_logo_venue">The Venue</div>
            <div className="header_logo_title">Musical Events</div>
          </div>
        </Toolbar>
        <IconButton
          aria-label="Menu"
          color="inherit"
          onClick={this.toggleDrawer}
        >
          <MenuIcon />
        </IconButton>
        <SideDrawer
          open={isDrawerOpen}
          onClose={this.toggleDrawer}
        />
      </AppBar>
    );
  }
}

export default Header;