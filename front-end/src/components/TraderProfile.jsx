import React, { Component } from 'react';
import { getTrader } from '../utils/traders';
import { getProjectsByTrader, filterProjects } from '../utils/projects';
import { ratingBgColorChooser } from '../utils';
import styled from 'styled-components';
// import GoogleMapReact from 'google-map-react';
// import TraderPin from './TraderPin';
// import ReviewList from '../components/ReviewList';
import UserInfo from './UserInfo';
// import ProjectCard from './ProjectCard';
import PastProjects from './PastProjects';

// const AvatarWrapper = styled.aside`
//   width: 6em;
//   border: 4px solid #fe7e0f;
//   margin: 5px;
//   border-radius: 50px;
//   height: 6em;
//   position: relative;
// `;

// const AvatarImg = styled.img`
//   width: 100%;
//   border-radius: 50%;
// `;

// const Rating = styled.div`
//   position: absolute;
//   bottom: -10px;
//   right: -10px;
//   width: 1.5em;
//   height: 1.5em;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   margin: 5px;
//   border-radius: 50%;
//   color: white;
//   padding: 0.5em;
//   font-size: 0.8em;
//   box-shadow: 1px 0 3px 0 rgb(0, 0, 0, 0.3);
//   text-shadow: 0 0 10px #000000;
//   background-color: ${props => ratingBgColorChooser(props.score)};
// `;

const Container = styled.div`
  display: flex;
  height: 100%;
  overflow-y: scroll;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

// const TraderInfo = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   border: solid blue 1px;
//   width: 100%;
//   height: 50%;
//   background: ${props => props.theme.trader};
// `;

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

// const Card = styled(ProjectCard)`
//   max-width: 300px;
// `;

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
