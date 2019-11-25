import React from 'react';
import styled from 'styled-components';
import { AppConsumer } from './AppContext';

export default function ProjectCard(props) {
  const Card = styled.div`
    float: left;
    height: 90%;
    min-width: 300px;
    margin: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    background: white;
    box-shadow: 1px 0 10px 0 rgb(0, 0, 0, 0.3);
    transition: transform 0.1s;
    &:hover {
      transform: scale(1.05);
      box-shadow: 1px 0 15px 0 rgb(0, 0, 0, 0.3);
      background: #f5f5f5;
    }
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
    font-size: 10px;
    justify-content: space-around;
    width: 105%;
    background: white;
    box-shadow: 1px 0 3px 0 rgb(0, 0, 0, 0.3);
  `;
  const ProjectImage = styled.div`
    height: 70%;
    width: 90%;
    display: flex;
    justify-content: center;
    align-items: center;
  `;
  const StatusBar = styled.div`
    width: 100%;
    background: ${props =>
      props.user.trade ? props.theme.trader : props.theme.user};
    height: 5%;
  `;

  const ProjectAvatar = styled.img`
    height: 100%;
  `;

  return (
    <AppConsumer>
      {user => {
        console.log(props.project);

        return (
          <Card>
            <p>{props.project.title}</p>
            <DateSection>
              <div>
                <DateText>{startDate}</DateText>
              </div>

              <p>-</p>

              <div>
                <DateText>{endDate}</DateText>
              </div>
            </DateSection>
            <ProjectImage>
              <ProjectAvatar src={props.project.avatar_ref} />
            </ProjectImage>
            <StatusBar user={user}></StatusBar>
          </Card>
        );
      }}
    </AppConsumer>
  );
}
