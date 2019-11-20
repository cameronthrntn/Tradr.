import React, { Component } from 'react';
import Logo from '../img/tradr-logo.png';
import { Nav, NavLogo, LogoHead, LogoBody  } from '../styles/Header';

class Header extends Component {
  state = {
    show: true,
    scrollPos: 0
  };
  render() {
    return (
      <>
        <Nav className={this.state.show ? 'active' : 'hidden'}>
          <NavLogo>
            <LogoHead>Tr</LogoHead>
            <LogoBody>adr.</LogoBody>
          </NavLogo>
        </Nav>
      </>
    );
  }
}

export default Header;
