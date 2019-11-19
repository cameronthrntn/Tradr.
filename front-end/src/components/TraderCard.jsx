import React from 'react';
import {getDistances} from '../utils'
import styled from 'styled-components';

export default function TraderCard(props) {
  const Trader = styled.li`
    display: flex;
    /* flex-direction: column; */
    justify-content: center;
    align-items: flex-start;
    height: 10%;
    border-bottom: 1px solid grey;
  `;
  const AvatarWrapper = styled.aside`
    width: 35%;
    border: 1px solid green;
  `;
  const Contents = styled.section`
    width: 65%;
    border: 1px solid blue;
  `;
  return (
    <Trader>
      <Contents>
        <p>{props.trader.username}</p>
        <p>Distance: {props.trader.distance}km</p>
      </Contents>
      <AvatarWrapper></AvatarWrapper>
    </Trader>
  );
}
