import React, { Component } from 'react';
import styled from 'styled-components';
import TraderCard from './TraderCard';
// import { getDistance } from '../utils';

export default class TraderList extends Component {
  render() {
    const List = styled.ul`
      list-style: none;
      padding: 15px;
      height: 90%;
      overflow-y: scroll;
    `;
    return (
      <List>
        {this.props.traders.map(trader => (
          <TraderCard trader={trader} key={trader.username} />
        ))}
      </List>
    );
  }
}
