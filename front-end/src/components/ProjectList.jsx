import React from 'react';
import ProjectCard from '../components/ProjectCard';
import styled from 'styled-components';

const Container = styled.div`
  border: solid orange 1px;
  height: 33%;
  @media (max-width: 768px) {
    min-height: 200px;
    overflow-y: scroll;
  }
`;
const ProjectListHeader = styled.div`
  border: solid yellow 1px;
  width: 100%;
  height: 5%;
`;
const Projects = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  border: solid grey 1px;
  display: flex;
  overflow-x: scroll;
  align-items: center;
  height: 95%;
`;

const ProjectList = props => {
  return (
    <Container>
      <ProjectListHeader>{props.heading}</ProjectListHeader>
      <Projects>
        {props.projects.map(project => (
          <ProjectCard project={project} />
        ))}
      </Projects>
    </Container>
  );
};

export default ProjectList;
