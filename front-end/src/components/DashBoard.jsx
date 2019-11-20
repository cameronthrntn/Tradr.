import React, { Component } from 'react';
import UserInfo from '../components/UserInfo';
import ProjectList from '../components/ProjectList';
import styled from 'styled-components';
import { getProjectsByUsername, getProjectsByTrader } from '../utils/projects';

const Container = styled.div`
  border: solid 1px green;
  display: flex;
  /* margin-top: 6vh; */
  height: 94vh;
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
    inPlanning: [],
    inProgress: [],
    complete: []
  };
  componentDidMount = async () => {
    const projects = await getProjectsByUsername(this.props.username);
    console.log(projects);
    this.setState({
      inPlanning: projects.filter(project => project.status === 'in planning'),
      inProgress: projects.filter(project => project.status === 'in progress'),
      complete: projects.filter(project => project.status === 'complete')
    });
  };
  render() {
    return (
      <Container>
        <UserInfo />
        <ProjectListsContainer>
          <ProjectList heading="In planning" projects={this.state.inPlanning} />
          <ProjectList heading="In Progress" projects={this.state.inProgress} />
          <ProjectList heading="Complete" projects={this.state.complete} />
        </ProjectListsContainer>
      </Container>
    );
  }
}
