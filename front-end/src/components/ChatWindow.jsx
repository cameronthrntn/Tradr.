import React, { Component } from 'react';
import styled from 'styled-components';
import NewMessageForm from './NewMessageForm';
import { getMessages } from '../utils/messages';

export default class ChatWindow extends Component {
  state = {
    messages: []
  };
  componentDidUpdate() {
    this.scrollToBottom();
  }
  scrollToBottom() {
    this.el.scrollIntoView();
  }
  updateMessages = message => {
    this.setState(curr => {
      return {
        messages: [...curr.messages, message]
      };
    });
  };
  componentDidMount = async () => {
    let messages = await getMessages(this.props.project_id);
    this.setState({ messages });
    this.scrollToBottom();
  };
  render() {
    const ChatWindow = styled.div`
      width: 29%;
      border: 2px solid
        ${props =>
          JSON.parse(sessionStorage.user).trade
            ? props.theme.trader
            : props.theme.user};
      border-radius: 5px;
      z-index: 1000;
      box-shadow: 1px 10px 10px ${props => props.theme.grey},
        inset 3px 3px 5px 0 rgb(0, 0, 0, 0.3);
      padding: 0 10px 0 10px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden;
      margin: 10px;
      height: 68vh;
      @media (max-width: 900px) {
        width: 90%;
      }
    `;
    const Messages = styled.ul`
      list-style: none;
      padding: 0;
      margin-top: 0;
      margin-bottom: 0;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      height: 90%;
      overflow-y: scroll;
    `;
    const TraderMessage = styled.li`
      padding: 15px 10px;
      /* border: 1px solid red; */
      margin-top: 30px;
      margin-bottom: 5px;
      width: 60%;
      font-size: 1.2rem;
      border-radius: 5px;
      background: ${props => props.theme.trader_light};
    `;
    const TraderOwnMessage = styled(TraderMessage)`
      background: ${props => props.theme.trader};
      align-self: flex-end;
      text-align: right;
    `;
    const OwnerMessage = styled(TraderMessage)`
      background: ${props => props.theme.user_light};
    `;
    const OwnerOwnMessage = styled(TraderMessage)`
      background: ${props => props.theme.user};
      align-self: flex-end;
      text-align: right;
    `;
    const Meta = styled.p`
      margin: 0;
      font-size: 0.8rem;
      color: #4f4c4d;
    `;
    return (
      <ChatWindow>
        <Messages>
          {this.state.messages.map(message => {
            return message.trader_username ? (
              message.trader_username ===
              JSON.parse(sessionStorage.user).username ? (
                <TraderOwnMessage key={message.message_id}>
                  <Meta>{message.trader_username}</Meta>
                  <p>{message.body}</p>
                  <Meta>{new Date(message.timestamp).toLocaleString()}</Meta>
                </TraderOwnMessage>
              ) : (
                <TraderMessage key={message.message_id}>
                  <Meta>{message.trader_username}</Meta>
                  <p>{message.body}</p>
                  <Meta>{new Date(message.timestamp).toLocaleString()}</Meta>
                </TraderMessage>
              )
            ) : message.user_username ===
              JSON.parse(sessionStorage.user).username ? (
              <OwnerOwnMessage key={message.message_id}>
                <Meta>{message.user_username}</Meta>
                <p>{message.body}</p>
                <Meta>{new Date(message.timestamp).toLocaleString()}</Meta>
              </OwnerOwnMessage>
            ) : (
              <OwnerMessage key={message.message_id}>
                <Meta>{message.user_username}</Meta>
                <p>{message.body}</p>
                <Meta>{new Date(message.timestamp).toLocaleString()}</Meta>
              </OwnerMessage>
            );
          })}
          <div
            ref={el => {
              this.el = el;
            }}
          />
        </Messages>
        <NewMessageForm
          project_id={this.props.project_id}
          updateMessages={this.updateMessages}
        />
      </ChatWindow>
    );
  }
}
