import React, { Component } from 'react';
import ProjectCard from '../components/ProjectCard';
import NewProjectForm from '../components/NewProjectForm';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { AppConsumer } from './AppContext';

const Container = styled.div`
  height: 350px;
  overflow-y: hidden;
  overflow-x: scroll;
  position: relative;
  @media (max-width: 768px) {
    min-height: 300px;
  }
`;
const ProjectListHeader = styled.div`
  height: 40px;
  background: ${props =>
    JSON.parse(sessionStorage.user).trade
      ? props.theme.trader
      : props.theme.user};
  box-shadow: 0 0px 8px 0px gray;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Projects = styled.div`
  width: auto;
  list-style: none;
  padding: 20px;
  margin: 0;
  display: flex;
  justify-content: flex-start;
  overflow-y: hidden;
  overflow-x: scroll;
  align-items: center;
  height: 80%;
`;

const AddProjectButton = styled.div`
  cursor: pointer;
  min-height: 100px;
  min-width: 100px;
  max-width: 100px;
  margin-right: 300px;
  margin: 20px;
  font-size: 15px;
  padding: 30px;
  background: ${props => props.theme.grey};
  color: ${props => props.theme.greytext};
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  box-shadow: 1px 0 10px 0 rgb(0, 0, 0, 0.3);
  transition: transform 0.1s;
  &:hover {
    transform: scale(1.05);
    box-shadow: 1px 0 15px 0 rgb(0, 0, 0, 0.3);
  }
`;

const AddProjectButtonContainer = styled.div`
  padding: 20px;
`;

const Heading = styled.h5`
  margin: 20px;
  color: white;
  font-size: 1.3rem;
`;

class ProjectList extends Component {
  state = {
    isAddingProject: false
  };

  handleBool = e => {
    this.setState(currentState => {
      return { isAddingProject: !currentState.isAddingProject };
    });
  };

  render() {
    return (
      <AppConsumer>
        {user => {
          return (
            <Container>
              {this.state.isAddingProject && (
                <NewProjectForm
                  handleBool={this.handleBool}
                  username={user.username}
                  updateInPlanning={this.props.updateInPlanning}
                />
              )}
              <ProjectListHeader>
                <Heading>{this.props.heading}</Heading>
              </ProjectListHeader>
              <Projects>
                {this.props.projects.map(project => (
                  <ProjectCard
                    project={project}
                    handleStatusChange={this.props.handleStatusChange}
                    key={project.project_id}
                  />


                ))}
                {this.props.heading === 'Planning' && !user.trade && (
                  <AddProjectButtonContainer>
                    <AddProjectButton onClick={this.handleBool}>
                      <p>
                        <FontAwesomeIcon icon={faPlus} />
                      </p>
                      <p>New project</p>
                    </AddProjectButton>
                  </AddProjectButtonContainer>
                )}
              </Projects>
            </Container>
          );
        }}
      </AppConsumer>
    );
  }
}

export default ProjectList;
