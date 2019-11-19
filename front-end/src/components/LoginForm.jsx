import React, { Component } from 'react';

import { Container, Form, LogInButton, Inputs, Input } from '../styles/Forms';

export default class LoginForm extends Component {
  render() {
    return (
      <Container>
        <Form action="">
          <Inputs>
            <Input type="text" placeholder="Username" />
            <Input type="text" placeholder="Password" />
          </Inputs>

          <LogInButton>Log in</LogInButton>
        </Form>
      </Container>
    );
  }
}
