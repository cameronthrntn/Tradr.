import React, { Component } from 'react';
import { postTrader, postUser, getCoordinates } from '../utils/makeAccount';
import {
  Container,
  Form,
  LogInButton,
  Inputs,
  Input,
  InputWrapper
} from '../styles/Forms';

export default class SignUpForm extends Component {
  state = {
    userType: 'user',
    first_name: '',
    last_name: '',
    username: '',
    // password: '',
    // confirmedPassword: '',
    dob: '',
    address1: '',
    postCode: '',
    personal_site: ''
  };

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  handleSubmit = async e => {
    e.preventDefault();
    const coords = await getCoordinates(this.state.address1)
    console.log(coords);
    
    // this.state.userType === 'user'
    //   ? postUser(this.state)
    //   : postTrader(this.state);
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
              <Input
                id="first_name"
                type="text"
                placeholder="First name"
                onChange={this.handleChange}
                required
              />
              <Input
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
            {/* <Input
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
            /> */}
            <label htmlFor="dob">Date of birth</label>
            <Input id="dob" type="date" onChange={this.handleChange} required />
            <InputWrapper>
              <Input
                id="address1"
                type="text"
                placeholder="First line of address"
                onChange={this.handleChange}
                required
              />
              <Input
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
