import React, { Component } from 'react';
import styled from 'styled-components';
import { navigate } from '@reach/router';

export default class ProjectTraderList extends Component {
  render() {
    const TraderList = styled.ul`
      width: 100vw;
      list-style: none;
      padding: 10px 0px;
      height: 6.5em;
      margin-top: 0;
      padding-left: 10px;
      display: flex;
      background: ${props =>
        JSON.parse(sessionStorage.user).trade
          ? props.theme.trader
          : props.theme.user};
      box-shadow: 1px 5px 5px ${props => props.theme.grey};
    `;
    const TraderCard = styled.li`
      margin: 5px;
      width: 5%;
      margin-right: 10px;
      padding: 0px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    `;
    const AvatarWrapper = styled.aside`
      width: 3em;
      border: 4px solid white;
      /* margin: 5px; */
      border-radius: 50%;
      height: 3em;
      position: relative;
    `;

    const TraderImg = styled.img`
      width: 100%;
      border-radius: 50%;
    `;
    const TraderName = styled.p`
      margin: 0;
      color: white;
      font-weight: bold;
    `;
    const TraderOccupation = styled.p`
      margin: 0;
      color: white;
    `;

    const AddTraderWrapper = styled(AvatarWrapper)`
      border: 4px dashed white;
      display: flex;
      width: 3.2rem;
      height: 3.2rem;
      justify-content: center;
      align-items: center;
      font-weight: bolder;
      font-size: 1.4rem;
      margin-bottom: 5px;
      color: white;
      transition: 0.3s;
    `;
    const AddTrader = styled.button`
      border: none;
      background: none;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      &:hover {
        > ${AddTraderWrapper} {
          transition: 0.3s;
          color: ${props =>
            JSON.parse(sessionStorage.user).trade
              ? props.theme.trader
              : props.theme.user};
          background: white;
        }
      }
    `;
    return (
      <TraderList>
        {this.props.traders.map(trader => (
          <TraderCard key={trader.trader_username}>
            <AvatarWrapper>
              <TraderImg src={trader.avatar_ref} />
            </AvatarWrapper>
            <TraderName>{trader.trader_username}</TraderName>
            <TraderOccupation>{trader.trade}</TraderOccupation>
          </TraderCard>
        ))}
        <AddTrader onClick={() => navigate(`/map/${this.props.project_id}`)}>
          <AddTraderWrapper>+</AddTraderWrapper>
          <TraderName>Add Trader</TraderName>
        </AddTrader>
      </TraderList>
    );
  }
}
