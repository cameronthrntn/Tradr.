import React from 'react';
import styled from 'styled-components';

export default function ProjectCard(props) {
  const Card = styled.li`
    float: left;
    border: 1px solid pink;
    height: 95%;
    width: 300px;
    margin: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  `;
  const DateText = styled.p`
    float: left;
  `;
  const startDate = new Date(props.project.start_date)
    .toLocaleString()
    .split(',')[0];
  const endDate = new Date(props.project.end_date)
    .toLocaleString()
    .split(',')[0];

  const DateSection = styled.div`
    display: flex;
    justify-content: space-around;
    width: 100%;
    border: 1px solid black;
  `;
  const ProjectImage = styled.div`
  height: 70%;
  width: 90%;
  border: 1px solid blue;
  `
  const StatusBar = styled.div`
    width: 100%;
    background: orange;
    height: 5%;
  `
  return (
    <Card>
      <p>{props.project.title}</p>
      <DateSection>
        <div>
          <DateText>{startDate}</DateText>
        </div>
        <div>
          <DateText>{endDate}</DateText>
        </div>
      </DateSection>
      <ProjectImage></ProjectImage>
      <StatusBar></StatusBar>
    </Card>
  );
}
