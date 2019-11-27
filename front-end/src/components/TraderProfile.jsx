import React, { Component } from 'react';
import { getTrader } from '../utils/traders';

import { getProjectsByTrader, filterProjects } from '../utils/projects';
import { ratingBgColorChooser } from '../utils';
import styled from 'styled-components';
import UserInfo from './UserInfo';
import PastProjects from './PastProjects';

const Container = styled.div`
  display: flex;
  height: 100%;
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

const TraderInfoAndReviews = styled.div`
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



class TraderProfile extends Component {
  state = {
    trader: {},
    completedProjects: []
  };

  componentDidMount = async () => {
    const trader = await getTrader(this.props.username);
    const projects = await getProjectsByTrader(this.props.username);
    const completedProjects = filterProjects(projects);
    this.setState({ trader, completedProjects });
  };

  render() {
    return (
      <Container>
        <UserInfo user={this.state.trader} />
        <PastProjects projects={this.state.completedProjects} />
      </Container>
    );
  }
}

export default TraderProfile;
