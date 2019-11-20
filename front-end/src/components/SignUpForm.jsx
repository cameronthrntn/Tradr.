import React, { Component } from 'react';

import {
  Container,
  Form,
  LogInButton,
  Inputs,
  Input,
  InputWrapper,
  HalfInput
} from '../styles/Forms';

export default class SignUpForm extends Component {
  state = {
    userType: 'user',
    first_name: null,
    last_name: null,
    username: null,
    password: null,
    confirmedPassword: null,
    dob: null,
    address1: null,
    postCode: null,
    personal_site: null
  };

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    console.dir(e);
  };

  render() {
    return (
      <Container>
        <Form
          userType={this.state.userType}
          action=""
          onSubmit={this.handleSubmit}
        >
          <Inputs>
            <InputWrapper>
              <label htmlFor="user">I am a:</label>
              <select name="user" id="userType" onChange={this.handleChange}>
                <option value="user">User</option>
                <option value="trader">Trader</option>
              </select>
            </InputWrapper>

            <InputWrapper>
              <HalfInput
                id="first_name"
                type="text"
                placeholder="First name"
                onChange={this.handleChange}
                required
              />
              <HalfInput
                id="last_name"
                type="text"
                placeholder="Last name"
                onChange={this.handleChange}
                required
              />
            </InputWrapper>

            <Input
              id="username"
              type="text"
              placeholder="Choose a username"
              onChange={this.handleChange}
              required
            />
            <Input
              id="password"
              type="text"
              placeholder="Choose a password"
              onChange={this.handleChange}
              required
            />
            <Input
              id="confirmedPassword"
              type="text"
              placeholder="Confirm password"
              onChange={this.handleChange}
              required
            />
            <label htmlFor="dob">Date of birth</label>
            <Input id="dob" type="date" onChange={this.handleChange} required />
            <InputWrapper>
              <HalfInput
                id="address1"
                type="text"
                placeholder="First line of address"
                onChange={this.handleChange}
                required
              />
              <HalfInput
                id="postCode"
                type="text"
                placeholder="Postcode"
                onChange={this.handleChange}
                required
              />
            </InputWrapper>

            {this.state.userType === 'trader' && (
              <>
                <Input
                  id="trade"
                  type="text"
                  placeholder="Trade"
                  onChange={this.handleChange}
                  required
                ></Input>
                <Input
                  id="personal_site"
                  type="text"
                  placeholder="Personal website URL"
                  onChange={this.handleChange}
                ></Input>
              </>
            )}
          </Inputs>

          <LogInButton>Sign up</LogInButton>
        </Form>
      </Container>
    );
  }
}
