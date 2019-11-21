import React, { Component } from 'react';
import { getTrader } from '../utils/traders';
import { ratingBgColorChooser } from '../utils';
import styled from 'styled-components';
import GoogleMapReact from 'google-map-react';
import TraderPin from './TraderPin';
import ReviewList from '../components/ReviewList';
import UserInfo from '../components/UserInfo';

const AvatarWrapper = styled.aside`
  width: 6em;
  border: 4px solid #fe7e0f;
  margin: 5px;
  border-radius: 50px;
  height: 6em;
  position: relative;
`;

const Rating = styled.div`
  position: absolute;
  bottom: -10px;
  right: -10px;
  width: 1.5em;
  height: 1.5em;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px;
  border-radius: 50%;
  color: white;
  padding: 0.5em;
  font-size: 0.8em;
  box-shadow: 1px 0 3px 0 rgb(0, 0, 0, 0.3);
  text-shadow: 0 0 10px #000000;
  background-color: ${props => ratingBgColorChooser(props.score)};
`;

const Container = styled.div`
  border: solid 1px green;
  display: flex;
  height: 100vh;
  overflow-y: scroll;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const TraderInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: solid blue 1px;
  width: 100%;
  height: 50%;
  background: ${props => props.theme.trader};
`;

const TraderInfoAndReviews = styled.div`
  border: solid green 1px;
  width: 30%;
  min-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 768px) {
    width: 100%;
    height: 50%;
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
        <UserInfo />

        <MapWrapper></MapWrapper>
      </Container>
    );
  }
}

export default TraderProfile;
