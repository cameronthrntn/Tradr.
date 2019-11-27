import React from 'react';
import styled from 'styled-components';
import PastProjectCard from './PastProjectCard';

const Container = styled.div`
  width: 70%;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ProjectListHeader = styled.div`
  height: 40px;
  background: ${props => props.theme.trader};
  box-shadow: 0 0px 8px 0px gray;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Heading = styled.h5`
  margin: 20px;
  color: white;
  font-size: 1.3rem;
`;

const Projects = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const PastProjects = props => {
  return (
    <Container>
      <ProjectListHeader>
        <Heading>Past projects</Heading>
      </ProjectListHeader>
      <Projects>
        {props.projects.map(project => {
          return <PastProjectCard project={project} />;
        })}
      </Projects>
    </Container>
  );
};

export default PastProjects;
