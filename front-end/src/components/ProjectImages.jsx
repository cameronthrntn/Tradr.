import React, { Component } from 'react';
import styled from 'styled-components';
import { getProjectImages } from '../utils/projects';
import ProjectImageUpload from './ProjectImageUpload';

const ImageArea = styled.section`
  width: 30%;
  /* height: 100%; */
  background: ${props =>
    JSON.parse(sessionStorage.user).trade
      ? props.theme.trader_dark
      : props.theme.user_dark};
  border-radius: 5px;
  padding: 10px;
  color: white;
  font-weight: bolder;
  font-size: 1.4rem;
  min-width: 350px;
  @media (max-width: 900px) {
    min-width: 0;
    max-width: 100vw;
    height: 400px;
    width: 100%;
    border-radius: 0;
  }
`;
const ImageList = styled.ul`
  display: flex;
  flex-wrap: wrap;

  margin: 20px;

  @media (max-width: 900px) {
    width: 100vw;
    flex-wrap: nowrap;
    flex-direction: row;
    overflow-x: scroll;
    border-radius: 0;
    justify-content: space space-between;
  }
`;
const ProjectImageWrapper = styled.div`
  position: relative;
  min-width: 100px;
  min-height: 100px;
  margin: 20px;
  overflow: hidden;
`;

const Image = styled.img`
  position: absolute;
  left: 50%;
  top: 50%;
  height: 100%;
  width: auto;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  box-shadow: 1px 2px 10px
    ${props =>
      JSON.parse(sessionStorage.user).trade
        ? props.theme.trader_dark
        : props.theme.user_dark};
`;

const ProjectImageUploadWrapper = styled.div`
  margin: 20px;
`;

export default class ProjectImages extends Component {
  state = {
    images: []
  };
  componentDidMount = async () => {
    const { images } = await getProjectImages(this.props.project_id);
    this.setState({ images });
  };

  updateImages = path => {
    console.log({ path }, '<----updating');

    this.setState(currentState => {
      return { images: [...currentState.images, { path }] };
    });
  };
  render() {
    return (
      <ImageArea>
        Images:
        <ImageList>
          {this.state.images.length === 0 ? (
            <h3>No images currently added</h3>
          ) : (
            this.state.images.map(image => {
              return (
                <ProjectImageWrapper key={image.image_id}>
                  <Image src={image.path} />
                </ProjectImageWrapper>
              );
            })
          )}
          <ProjectImageUploadWrapper>
            <ProjectImageUpload
              updateImages={this.updateImages}
              project_id={this.props.project_id}
            />
          </ProjectImageUploadWrapper>
        </ImageList>
      </ImageArea>
    );
  }
}
