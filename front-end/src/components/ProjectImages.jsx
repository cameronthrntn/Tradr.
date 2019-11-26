import React, { Component } from 'react';
import styled from 'styled-components';

const ImageArea = styled.section`
  width: 30%;
  height: 100%;
  background: ${props =>
    JSON.parse(sessionStorage.user).trade
      ? props.theme.trader
      : props.theme.user};
  border-radius: 5px;
  overflow-y: scroll;
  padding: 10px;
  color: white;
  font-weight: bolder;
  font-size: 1.4rem;
`;
const ImageList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  padding-left: 10px;
`;
const ProjectImage = styled.div`
  width: 125px;
  height: 125px;
  background: white;
  margin: 10px;
  box-shadow: 1px 2px 10px
    ${props =>
      JSON.parse(sessionStorage.user).trade
        ? props.theme.trader_dark
        : props.theme.user_dark};
`;

export default class ProjectImages extends Component {
  render() {
    return (
      <ImageArea>
        Images:
        <ImageList>
          <ProjectImage />
          <ProjectImage />
          <ProjectImage />
          <ProjectImage />
          <ProjectImage />
          <ProjectImage />
          <ProjectImage />
          <ProjectImage />
          <ProjectImage />
          <ProjectImage />
        </ImageList>
      </ImageArea>
    );
  }
}
