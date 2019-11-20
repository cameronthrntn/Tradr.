import React, { Component } from 'react';
import UserInfo from '../components/UserInfo';
import ProjectList from '../components/ProjectList';
import styled from 'styled-components';
import { getProjectsByUsername, getProjectsByTrader } from '../utils/projects';

const Container = styled.div`
  border: solid 1px green;
  display: flex;
  height: 100vh;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ProjectListsContainer = styled.div`
  border: solid red 1px;
  width: 70%;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export default class DashBoard extends Component {
  state = {
    projects: []
  };
  componentDidMount() {
    get;
  }
  render() {
    return (
      <Container>
        <UserInfo username={this.props.username} />
        <ProjectListsContainer>
          <ProjectList projects="" />
          <ProjectList projects="" />
          <ProjectList projects="" />
        </ProjectListsContainer>
      </Container>
    );
  }
}
