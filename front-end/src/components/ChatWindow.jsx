import React, { Component } from 'react';
import styled from 'styled-components';
import NewMessageForm from './NewMessageForm';
import { getMessages } from '../utils/messages';

export default class ChatWindow extends Component {
  state = {
    messages: []
  };
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
      box-shadow: 1px 10px 10px ${props => props.theme.grey};
      padding: 10px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden;
      margin-left: 1%;
      height: 70vh;
    `;
    const Messages = styled.ul`
      list-style: none;
      padding: 0;
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
      margin-top: 5px;
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
      color: ${props => props.theme.greytext};
    `;
    return (
      <ChatWindow>
        <Messages>
          {this.state.messages.map(message => {
            console.log(message);
            return message.trader_username ? (
              message.trader_username ===
              JSON.parse(sessionStorage.user).username ? (
                <TraderOwnMessage>
                  <Meta>{message.trader_username}</Meta>
                  <p>{message.body}</p>
                  <Meta>{new Date(message.timestamp).toLocaleString()}</Meta>
                </TraderOwnMessage>
              ) : (
                <TraderMessage>
                  <Meta>{message.trader_username}</Meta>
                  <p>{message.body}</p>
                  <Meta>{new Date(message.timestamp).toLocaleString()}</Meta>
                </TraderMessage>
              )
            ) : message.user_username ===
              JSON.parse(sessionStorage.user).username ? (
              <OwnerOwnMessage>
                <Meta>{message.user_username}</Meta>
                <p>{message.body}</p>
                <Meta>{new Date(message.timestamp).toLocaleString()}</Meta>
              </OwnerOwnMessage>
            ) : (
              <OwnerMessage>
                <Meta>{message.user_username}</Meta>
                <p>{message.body}</p>
                <Meta>{new Date(message.timestamp).toLocaleString()}</Meta>
              </OwnerMessage>
            );
          })}
        </Messages>
        <NewMessageForm
          project_id={this.props.project_id}
          updateMessages={this.updateMessages}
        />
      </ChatWindow>
    );
  }
}
