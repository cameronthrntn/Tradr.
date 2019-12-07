import React, { Component } from 'react';
import { navigate } from '@reach/router';
import styled from 'styled-components';
import { getAge } from '../utils';
import { postAccount, getCoordinates, formatDate } from '../utils/makeAccount';
import {
  Container,
  SignUpFormStyle,
  SignUpButton,
  Inputs,
  Input,
  InputWrapper,
  HalfInput,
  SignUpContainer,
  ErrorMessage,
  SignUpOverlay,
  SignUpWrapper
} from '../styles/Forms';
import { FilterSelect } from '../styles/Filters';

import { Info } from '../styles/LandingPage';

const SignUpFormSelect = styled.select`
  width: 70%;
  background: white;
  font-size: 1.2rem;
  border: none;
  height: 100%;
`;

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
    personal_site: '',
    passwordsMatch: true,
    strongPassword: true,
    over18: true,
    valid_rate: true
  };

  handleChange = async e => {
    const { id } = e.target;
    await this.setState({ [id]: e.target.value });
    if (id === 'confirmedPassword' || id === 'password') {
      this.state.confirmedPassword !== this.state.password
        ? this.setState({ passwordsMatch: false })
        : this.setState({ passwordsMatch: true });
    }
    if (id === 'rate') {
      if (Number(this.state.rate) < 0) {
        this.setState({ valid_rate: false });
      } else {
        this.setState({ valid_rate: true });
      }
    }
    getAge(new Date(this.state.dob)) < 18
      ? this.setState({ over18: false })
      : this.setState({ over18: true });
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
      dob
    };
    if (
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/.test(
        this.state.password
      )
    ) {
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

      if (
        this.state.passwordsMatch &&
        this.state.strongPassword &&
        this.state.over18 &&
        this.state.valid_rate
      ) {
        navigate('/');
      }
    } else {
      this.setState({ strongPassword: false });
    }
  };

  render() {
    return (
      <SignUpContainer>
        <SignUpOverlay />
        <Info>Sign up today.</Info>
        <SignUpFormStyle
          userType={this.state.userType}
          action=""
          onSubmit={this.handleSubmit}
        >
          <Inputs>
            <InputWrapper>
              <label htmlFor="user">I am a:</label>
              <SignUpFormSelect
                name="user"
                id="userType"
                onChange={this.handleChange}
              >
                <option value="user">User</option>
                <option value="trader">Trader</option>
              </SignUpFormSelect>
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
              type="password"
              placeholder="Choose a password"
              onChange={this.handleChange}
              required
            />
            <Input
              id="confirmedPassword"
              type="password"
              placeholder="Confirm password"
              onChange={this.handleChange}
              required
            />
            {!this.state.passwordsMatch && (
              <ErrorMessage>Your passwords do not match!</ErrorMessage>
            )}
            {!this.state.strongPassword && (
              <ErrorMessage>
                Your password must contain a capital letter, number, and special
                character!
              </ErrorMessage>
            )}

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
                        required
                      />
                      <HalfInput
                        id="postCode"
                        type="text"
                        placeholder="Postcode"
                        onChange={this.handleChange}
                        required
                      />
                    </>
                  )}
                </InputWrapper>
                <Input
                  id="rate"
                  type="number"
                  placeholder="rate"
                  onChange={this.handleChange}
                  required
                ></Input>
                {!this.state.valid_rate && (
                  <ErrorMessage>Your rate must be at least 0!</ErrorMessage>
                )}
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

          {!this.state.over18 && (
            <ErrorMessage>You must be over 18 to sign up</ErrorMessage>
          )}

          {this.state.passwordsMatch &&
          this.state.strongPassword &&
          this.state.over18 &&
          this.state.rate ? (
            <Link to="/">
              <SignUpButton>Sign up</SignUpButton>
            </Link>
          ) : (
            <SignUpButton>Sign up</SignUpButton>
          )}


        </SignUpFormStyle>
      </SignUpContainer>
    );
  }
}
