import React from 'react';
import { Link } from '@reach/router';
import {
  Page,
  ExampleWrapper,
  LogInWrapper,
  LogInButton
} from '../styles/LandingPage';

export default function LandingPage() {
  return (
    <Page>
      <ExampleWrapper></ExampleWrapper>
      <LogInWrapper>
        <Link to="/login">
          <LogInButton>Log in</LogInButton>
        </Link>
        <Link to="/signup">
          <LogInButton>Sign Up</LogInButton>
        </Link>
      </LogInWrapper>
    </Page>
  );
}
