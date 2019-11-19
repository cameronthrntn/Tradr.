import React, { Component } from 'react';
import styled from 'styled-components';
import Logo from '../img/tradr-logo.png';

const Nav = styled.nav`
  background: white;
  height: 8em;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 10000;
  box-shadow: 0 4px 8px -2px gray;
  display: flex;
`;

const NavLogo = styled.img`
  width: 10em;
  margin: 1em;
`;

class Header extends Component {
  state = {
    show: true,
    scrollPos: 0
  };

  render() {
    return (
      <>
        <Nav className={this.state.show ? 'active' : 'hidden'}>
          <NavLogo src={Logo} alt="" />
        </Nav>
      </>
    );
  }
}

export default Header;
