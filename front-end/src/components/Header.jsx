import React, { Component } from 'react';
import { Link, navigate } from '@reach/router';
import {
  Nav,
  NavLogo,
  LogoHead,
  LogoBody,
  SignOutButton,
  LoggedInUser
} from '../styles/Header';
import { AppConsumer } from './AppContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

class Header extends Component {
  state = {
    show: true,
    scrollPos: 0
  };
  signOut = async () => {
    navigate('/');
    this.props.signout();
  };
  render() {
    return (
      <AppConsumer>
        {user => {
          return (
            <>
              <Nav className={this.state.show ? 'active' : 'hidden'}>
                <Link to="/">
                  <NavLogo>
                    <LogoHead>Tr</LogoHead>
                    <LogoBody>adr.</LogoBody>
                  </NavLogo>
                </Link>
                {this.props.isLoggedIn && (
                  <LoggedInUser>
                    <div>
                      <FontAwesomeIcon icon={faUser}></FontAwesomeIcon> &nbsp;
                      {user.username}
                    </div>

                    <SignOutButton user={user} onClick={this.signOut}>
                      Sign out
                    </SignOutButton>
                  </LoggedInUser>
                )}
              </Nav>
            </>
          );
        }}
      </AppConsumer>
    );
  }
}

export default Header;
