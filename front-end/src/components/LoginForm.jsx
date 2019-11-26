import React, { Component } from 'react';
import { login } from '../utils/login';
import { Container, Form, Inputs, Input, Select } from '../styles/Forms';
import { navigate } from '@reach/router';
import { getUser } from '../utils/users.js';
import { getTrader } from '../utils/traders.js';
import { LogInButton } from '../styles/LandingPage';
import styled from 'styled-components';

const ErrorLoggingIn = styled.p`
  color: red;
`;

export default class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    type: 'user',
    invalidLogin: false
  };
  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevState.type !== this.state.type) {
      this.props.changeStyle(this.state.type);
    }
  }
  handleSubmit = async e => {
    e.preventDefault();
    const { username, password, type } = this.state;
    try {
      const token = await login({ username, password, type });
      const user =
        this.state.type === 'user'
          ? await getUser(this.state.username)
          : await getTrader(this.state.username);
      await this.props.initialiseAccount(token, user);
    } catch (e) {
      this.setState({ invalidLogin: true });
    }
    navigate('/');
  };
  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  render() {
    return (
      <Container>
        <Form userType={this.state.type} onSubmit={this.handleSubmit}>
          <Inputs>
            <Select
              id="type"
              value={this.state.type}
              onChange={this.handleChange}
            >
              <option value="user">User</option>
              <option value="trader">Trader</option>
            </Select>
            <Input
              id="username"
              type="text"
              placeholder="Username"
              onChange={this.handleChange}
            />
            <Input
              id="password"
              type="password"
              placeholder="Password"
              onChange={this.handleChange}
            />
          </Inputs>
          {this.state.invalidLogin && (
            <ErrorLoggingIn>
              Either your username or password was incorrect!
            </ErrorLoggingIn>
          )}
          <LogInButton>Log in</LogInButton>
        </Form>
      </Container>
    );
  }
}
