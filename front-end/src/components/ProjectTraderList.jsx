import React, { Component } from 'react';
import styled from 'styled-components';
import { navigate } from '@reach/router';

export default class ProjectTraderList extends Component {
  render() {
    const TraderList = styled.ul`
      width: 100vw;
      list-style: none;
      padding: 0;
      height: 5vh;
      border: 1px solid yellow;
      padding-left: 10px;
      display: flex;
    `;
    const TraderCard = styled.li`
      margin: 5px;
      padding: 10px;
      border: 1px solid red;
    `;
    return (
      <TraderList>
        {this.props.traders.map(trader => (
          <TraderCard key={trader.trader_username}>
            {trader.trader_username}
          </TraderCard>
        ))}
        <button onClick={() => navigate(`/map/${this.props.project_id}`)}>
          add trader
        </button>
      </TraderList>
    );
  }
}
