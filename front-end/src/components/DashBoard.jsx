import React, { Component } from 'react';
import UserInfo from '../components/UserInfo';
import ProjectList from '../components/ProjectList';
import styled from 'styled-components';
import { getProjectsByUsername, getProjectsByTrader } from '../utils/projects';
import { AppConsumer } from './AppContext';

const Container = styled.div`
  overflow-y: scroll;
  display: flex;
  height: 100vh;
  overflow-y: scroll;
  @media (max-width: 768px) {
    flex-direction: column;
    overflow-y: scroll;
    height: 100%;
  }
`;

const ProjectListsContainer = styled.div`
  width: 70%;
  overflow-y: scroll;
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
    this.setState({
      inPlanning: projects.filter(project => project.status === 'in planning'),
      inProgress: projects.filter(project => project.status === 'in progress'),
      complete: projects.filter(project => project.status === 'complete')
    });
  };

  updateInPlanning = project => {
    this.setState(currentState => {
      return { inPlanning: [...currentState.inPlanning, project] };
    });
  };

  render() {
    return (
      <AppConsumer>
        {user => {
          return (
            <Container>
              <UserInfo
                user={user}
                updateUserInfo={this.props.updateUserInfo}
              />
              <ProjectListsContainer>
                <ProjectList
                  heading="Planning"
                  projects={this.state.inPlanning}
                  updateInPlanning={this.updateInPlanning}
                />
                <ProjectList
                  heading="In progress"
                  projects={this.state.inProgress}
                />
                <ProjectList
                  heading="Complete"
                  projects={this.state.complete}
                />
              </ProjectListsContainer>
            </Container>
          );
        }}
      </AppConsumer>
    );
  }
}
