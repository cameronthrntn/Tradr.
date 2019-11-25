import React, { Component } from 'react';
import { Link } from '@reach/router';
import {
  Page,
  UserWrapper,
  TraderWrapper,
  LogInWrapper,
  LogInButton,
  LogInSection,
  SignUpSection,
  LoginSide,
  Header
} from '../styles/LandingPage';
import { LogoHead, LogoBody } from '../styles/Header';
import LoginForm from './LoginForm';

export default class LandingPage extends Component {
  state = {
    style: 'user'
  };
  changeStyle = style => {
    this.setState({ style });
  };
  render() {
    return (
      <Page>
        {this.state.style === 'user' ? (
          <UserWrapper>
            <p>See who's</p>
            <p>around to</p>
            <p>help.</p>
          </UserWrapper>
        ) : (
          <TraderWrapper>
            <p>See who</p>
            <p>needs a</p>
            <p>hand.</p>
          </TraderWrapper>
        )}

        <LoginSide>
          <Header>
            <LogoHead>Tr</LogoHead>
            <LogoBody>adr.</LogoBody>
          </Header>
          <LogInWrapper>
            {/* <LogInSection> */}
            <LoginForm
              initialiseAccount={this.props.initialiseAccount}
              changeStyle={this.changeStyle}
            />
            {/* <Link to="/login">
              <LogInButton>Log in</LogInButton>
            </Link> */}
            {/* </LogInSection> */}
            <SignUpSection>
              <Link to="/signup">
                <LogInButton>Sign Up</LogInButton>
              </Link>
            </SignUpSection>
          </LogInWrapper>
        </LoginSide>
      </Page>
    );
  }
}
