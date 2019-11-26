import React, { Component } from 'react';
import firebase from 'firebase';
import FileUploader from 'react-firebase-file-uploader';
import styled from 'styled-components';
import { uploadAvatar } from '../utils/uploadAvatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { uploadProjectImage } from '../utils/uploadProjectImage';

const Container = styled.label``;

class ProjectImageUpload extends Component {
  state = {
    username: '',
    avatar: '',
    isUploading: false,
    progress: 0,
    avatarURL: ''
  };

  handleChangeUsername = event =>
    this.setState({ username: event.target.value });

  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });

  handleProgress = progress => this.setState({ progress });

  handleUploadError = error => {
    this.setState({ isUploading: false });
    console.error(error);
  };

  handleUploadSuccess = async filename => {
    this.setState({ avatar: filename, progress: 100, isUploading: false });
    const url = await firebase
      .storage()
      .ref('projects')
      .child(filename)
      .getDownloadURL();

    await uploadProjectImage(this.props.project_id, url);
    this.props.updateImages(url);
  };

  render() {
    return (
      <Container
        style={{
          cursor: 'pointer'
        }}
      >
        <FontAwesomeIcon icon={faPlus} /> Add new image
        <FileUploader
          hidden
          accept="image/*"
          storageRef={firebase.storage().ref('projects')}
          onUploadStart={this.handleUploadStart}
          onUploadError={this.handleUploadError}
          onUploadSuccess={this.handleUploadSuccess}
          onProgress={this.handleProgress}
        />
      </Container>
    );
  }
}

export default ProjectImageUpload;
