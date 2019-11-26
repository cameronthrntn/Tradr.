import React, { Component } from 'react';
import styled from 'styled-components';
import { getProjectImages } from '../utils/projects';
import { loadavg } from 'os';

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
const ProjectImageWrapper = styled.div`
  width: 125px;
  height: 125px;
  margin: 10px;
`;

const Image = styled.img`
  width: 100%;
  box-shadow: 1px 2px 10px
    ${props =>
      JSON.parse(sessionStorage.user).trade
        ? props.theme.trader_dark
        : props.theme.user_dark};
`;

export default class ProjectImages extends Component {
  state = {
    images: []
  };
  componentDidMount = async () => {
    const { images } = await getProjectImages(this.props.project_id);
    this.setState({ images });
  };

  render() {
    console.log(this.state.images, '<-----');

    return (
      <ImageArea>
        Images:
        <ImageList>
          {this.state.images.length === 0 ? (
            <h3>No images currently added</h3>
          ) : (
            this.state.images.map(image => {
              return (
                <ProjectImageWrapper>
                  <Image src={image.path} />
                </ProjectImageWrapper>
              );
            })
          )}
        </ImageList>
      </ImageArea>
    );
  }
}
