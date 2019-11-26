import React, { Component } from 'react';
import { postAccount, getCoordinates, formatDate } from '../utils/makeAccount';
import {
  Container,
  Form,
  LogInButton,
  Inputs,
  Input,
  InputWrapper,
  HalfInput,
  SignUpContainer
} from '../styles/Forms';

export default class SignUpForm extends Component {
  state = {
    userType: 'user',
    first_name: '',
    last_name: '',
    username: '',
    country: '',
    password: '',
    confirmedPassword: '',
    dob: '',
    house: '',
    town: '',
    city: '',
    postCode: '',
    personal_site: ''
  };

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  handleSubmit = async e => {
    e.preventDefault();
    const {
      house,
      town,
      city,
      postcode,
      username,
      first_name,
      last_name,
      trade,
      dob,
      personal_site,
      rate,
      password
    } = this.state;
    const { lat, lng } = await getCoordinates(
      `${house},${town},${city},${postcode}`
    );
    const standardValues = {
      password,
      username,
      first_name,
      last_name,
      dob: formatDate(dob)
    };

    const account =
      this.state.userType === 'user'
        ? await postAccount('user', standardValues)
        : await postAccount('trader', {
            ...standardValues,
            personal_site,
            trade,
            rate: Number(rate),
            lat,
            lng
          });
  };

  render() {
    return (
      <SignUpContainer>
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
                // required
              />
              <HalfInput
                id="last_name"
                type="text"
                placeholder="Last name"
                onChange={this.handleChange}
                // required
              />
            </InputWrapper>

            <Input
              id="username"
              type="text"
              placeholder="Choose a username"
              onChange={this.handleChange}
              // required
            />
            <Input
              id="password"
              type="text"
              placeholder="Choose a password"
              onChange={this.handleChange}
              // required
            />
            <Input
              id="confirmedPassword"
              type="text"
              placeholder="Confirm password"
              onChange={this.handleChange}
              // required
            />
            <label htmlFor="dob">Date of birth</label>
            <Input id="dob" type="date" onChange={this.handleChange} />
            {this.state.userType === 'trader' && (
              <>
                <InputWrapper>
                  <select
                    id="country"
                    onChange={this.handleChange}
                    value={this.state.country}
                  >
                    <option value="" selected default>
                      Select Country
                    </option>
                    <option value="United Kingdom">United Kingdom</option>
                  </select>
                  {this.state.country && (
                    <>
                      <HalfInput
                        id="house"
                        type="text"
                        placeholder="First line of address"
                        onChange={this.handleChange}
                        // required
                      />
                      <HalfInput
                        id="town"
                        type="text"
                        placeholder="town/village"
                        onChange={this.handleChange}
                        // required
                      />
                      <HalfInput
                        id="city"
                        type="text"
                        placeholder="city"
                        onChange={this.handleChange}
                        // required
                      />
                      <HalfInput
                        id="postCode"
                        type="text"
                        placeholder="Postcode"
                        onChange={this.handleChange}
                        // required
                      />
                    </>
                  )}
                </InputWrapper>
                <Input
                  id="rate"
                  type="number"
                  placeholder="rate"
                  onChange={this.handleChange}
                  // required
                ></Input>
                <Input
                  id="trade"
                  type="text"
                  placeholder="Trade"
                  onChange={this.handleChange}
                  // required
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
      </SignUpContainer>
    );
  }
}
