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
  Header,
  Info,
  Logo
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
            <Info>See who's around to help.</Info>
          </UserWrapper>
        ) : (
          <TraderWrapper>
            {' '}
            <Info>See who needs a hand.</Info>
          </TraderWrapper>
        )}

        <LoginSide>
          <Header>
            <Logo>
              <LogoHead>Tr</LogoHead>
              <LogoBody>adr.</LogoBody>
            </Logo>
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
