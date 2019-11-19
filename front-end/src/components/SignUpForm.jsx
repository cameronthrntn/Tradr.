import React, { Component } from 'react';

import { Container, Form, LogInButton, Inputs, Input } from '../styles/Forms';

export default class LoginForm extends Component {
  state = {
    userType: 'user'
  };

  handleChange = e => {
    console.log(e.target.value);

    const userType = e.target.value;
    this.setState({ userType });
  };

  render() {
    return (
      <Container>
        <Form userType={this.state.userType} action="">
          <Inputs>
            <label htmlFor="user">I am a/an:</label>
            <select name="user" onChange={this.handleChange}>
              <option value="user">User</option>
              <option value="trader">Trader</option>
            </select>
            <Input type="text" placeholder="First name" />
            <Input type="text" placeholder="Last name" />
            <Input type="text" placeholder="Choose a username" />
            <Input type="text" placeholder="Choose a password" />
            <Input type="date" placeholder="Date of birth" />
            <Input type="text" placeholder="First line of address" />
            <Input type="text" placeholder="Postcode" />
            {this.state.userType === 'trader' && (
              <>
                <Input type="text" placeholder="Trade"></Input>
                <Input type="text" placeholder="Personal website URL"></Input>
              </>
            )}
          </Inputs>

          <LogInButton>Sign up</LogInButton>
        </Form>
      </Container>
    );
  }
}
