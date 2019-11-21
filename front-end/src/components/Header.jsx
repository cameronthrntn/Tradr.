import React, { Component } from 'react';
import { Link } from '@reach/router';
import { Nav, NavLogo, LogoHead, LogoBody } from '../styles/Header';

class Header extends Component {
  state = {
    show: true,
    scrollPos: 0
  };
  signOut = () => {
    this.props.signout();
  };
  render() {
    return (
      <>
        <Nav className={this.state.show ? 'active' : 'hidden'}>
          <Link to="/">
            <NavLogo>
              <LogoHead>Tr</LogoHead>
              <LogoBody>adr.</LogoBody>
            </NavLogo>
          </Link>
            <button onClick={this.signOut}>Sign out</button>
        </Nav>
      </>
    );
  }
}

export default Header;
