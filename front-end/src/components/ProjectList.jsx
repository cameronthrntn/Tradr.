import React from 'react';
import ProjectCard from '../components/ProjectCard';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { AppConsumer } from './AppContext';

const Container = styled.div`
  height: 350px;
  overflow-y: hidden;
  overflow-x: scroll;
  @media (max-width: 768px) {
    min-height: 300px;
  }
`;
const ProjectListHeader = styled.div`
  height: 40px;
  background: ${props => props.theme.grey};
  box-shadow: 0 0px 8px 0px gray;
  border-radius: 0 34px 34px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Projects = styled.div`
  width: auto;
  list-style: none;
  border: solid orange 2px;
  padding: 20px;
  margin: 0;
  display: flex;
  justify-content: space-between;
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

const Heading = styled.h5`
  margin: 20px;
`;

const ProjectList = props => {
  return (
    <AppConsumer>
      {user => {
        return (
          <Container>
            <ProjectListHeader>
              <Heading>{props.heading}</Heading>
            </ProjectListHeader>
            <Projects>
              {props.projects.map(project => (
                <ProjectCard project={project} />
              ))}
              {props.heading === 'Planning' && !user.trade && (
                <AddProjectButton>
                  <p>
                    <FontAwesomeIcon icon={faPlus} />
                  </p>
                  <p>New project</p>
                </AddProjectButton>
              )}
            </Projects>
          </Container>
        );
      }}
    </AppConsumer>
  );
};

export default ProjectList;
