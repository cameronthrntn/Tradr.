import React from 'react';
import ProjectCard from '../components/ProjectCard';
import styled from 'styled-components';

const Container = styled.div`
  border: solid orange 1px;
  height: 31%;
  @media (max-width: 768px) {
    min-height: 200px;
    overflow-y: scroll;
  }
`;

const ProjectListHeader = styled.div`
  border: solid yellow 1px;
  display: flex;
`;
const Projects = styled.div`
  border: solid grey 1px;
  display: flex;
  overflow-x: scroll;
  align-items: center;
`;

const ProjectList = props => {
  return (
    <Container>
      <ProjectListHeader>HEADER</ProjectListHeader>
      <Projects></Projects>
    </Container>
  );
};

export default ProjectList;
