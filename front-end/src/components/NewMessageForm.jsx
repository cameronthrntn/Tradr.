import React, { Component } from 'react';
import styled from 'styled-components';
import { postMessage } from '../utils/messages';

const MessageForm = styled.form`
  width: 110%;
  height: 10%;
  margin-left: -5%;
  margin-bottom: -5%;
  padding-left: 1%;
  padding-top: 3%;
  padding-bottom: 5%;
  background: ${props =>
    JSON.parse(sessionStorage.user).trade
      ? props.theme.trader
      : props.theme.user};
  display: flex;
  justify-content: center;
  align-items: center;
`;
const MessageLabel = styled.label`
  width: 70%;
  height: 70%;
  font-size: 1.2rem;
`;
const MessageBox = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  font-size: 1.2rem;
`;
const SubmitButton = styled.button`
  width: 10%;
  height: 70%;
  margin-left: 5px;
  border-radius: 5px;
  color: white;
  font-size: 2rem;
  font-weight: bolder;
  background: ${props =>
    JSON.parse(sessionStorage.user).trade
      ? props.theme.user
      : props.theme.trader};
  cursor: pointer;
  border: none;
`;

export default class NewMessageForm extends Component {
  state = {
    body: ''
  };
  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  handleSubmit = async e => {
    e.preventDefault();
    const message = JSON.parse(sessionStorage.user).trade
      ? await postMessage({
          body: this.state.body,
          project_id: this.props.project_id,
          trader_username: JSON.parse(sessionStorage.user).username
        })
      : await postMessage({
          body: this.state.body,
          project_id: this.props.project_id,
          user_username: JSON.parse(sessionStorage.user).username
        });
    this.props.updateMessages(message);
  };
  render() {
    return (
      <MessageForm onSubmit={this.handleSubmit}>
        <MessageLabel htmlFor="body">
          <MessageBox
            key="messageInputBox"
            id="body"
            value={this.state.body}
            onChange={this.handleChange}
            type="text"
          />
        </MessageLabel>
        <SubmitButton>></SubmitButton>
      </MessageForm>
    );
  }
}
