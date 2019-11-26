import React, { Component } from 'react';
import { getTrader } from '../utils/traders';
import styled from 'styled-components';
import UserInfo from '../components/UserInfo';

const Container = styled.div`
  display: flex;
  height: 100vh;
  overflow-y: scroll;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;
const MapWrapper = styled.div`
  border: solid red 1px;
  width: 70%;
  @media (max-width: 768px) {
    height: 50%;
    width: 100%;
  }
`;

class TraderProfile extends Component {
  state = {
    trader: {}
  };

  componentDidMount = async () => {
    const trader = await getTrader(this.props.username);
    this.setState({ trader });
  };

  render() {
    return (
      <Container>
        <UserInfo user={this.state.trader} />
        <MapWrapper></MapWrapper>
      </Container>
    );
  }
}

export default TraderProfile;
