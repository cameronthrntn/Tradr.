import React, { Component } from 'react';
import {
  Container,
  Form,
  LogInButton,
  Inputs,
  Input
} from '../styles/LoginForm';

import { Container, Form, LogInButton, Inputs, Input } from '../styles/Forms';

export default class LoginForm extends Component {
  state = {
    username: null,
    password: null
  };
  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();
  };
  render() {
    return (
      <Container>
        <Form action="" onSubmit={this.handleSubmit}>
          <Inputs>
            <Input
              id="username"
              type="text"
              placeholder="Username"
              onChange={this.handleChange}
            />
            <Input
              id="password"
              type="text"
              placeholder="Password"
              onChange={this.handleChange}
            />
          </Inputs>

          <LogInButton>Log in</LogInButton>
        </Form>
      </Container>
    );
  }
}
