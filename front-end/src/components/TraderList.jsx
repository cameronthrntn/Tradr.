import React, { Component } from 'react';
import styled from 'styled-components';
import TraderCard from './TraderCard';

export default class TraderList extends Component {
  render() {
    const List = styled.ul`
      display: flex;
      flex-direction: column;
      list-style: none;
      padding: 15px;
      height: 90%;
      overflow-y: scroll;
      @media (max-width: 900px) {
        flex-direction: row;
        overflow-x: scroll;
      }
    `;
    return (
      <List>
        {this.props.traders.length > 0 ? (
          this.props.traders.map(trader => (
            <TraderCard trader={trader} key={trader.username} />
          ))
        ) : (
          <h1>-There are no traders nearby-</h1>
        )}
      </List>
    );
  }
}
