import React, { Component } from 'react';
import firebase from 'firebase';
import FileUploader from 'react-firebase-file-uploader';
import styled from 'styled-components';
import { uploadAvatar } from '../utils/uploadAvatar';

const config = {
  apiKey: 'AIzaSyC7jPTrrIK8sgqlUOWH4itIq_eVcPGNUzc',
  authDomain: 'tradr-4959b.firebaseapp.com',
  databaseURL: 'https://tradr-4959b.firebaseio.com',
  projectId: 'tradr-4959b',
  storageBucket: 'tradr-4959b.appspot.com',
  messagingSenderId: '873020937409',
  appId: '1:873020937409:web:657bccc99b314f18103040',
  measurementId: 'G-SWZM8KKS4K'
};
firebase.initializeApp(config);

class AvatarUpload extends Component {
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
      .ref('images')
      .child(filename)
      .getDownloadURL();

    await uploadAvatar(this.props.trader, this.props.username, url);
    this.props.updateAvatar(url);
  };

  render() {
    return (
      <label
        style={{
          backgroundColor: 'steelblue',
          color: 'white',
          padding: 10,
          borderRadius: 4,
          cursor: 'pointer'
        }}
      >
        Select your awesome avatar
        <FileUploader
          hidden
          accept="image/*"
          storageRef={firebase.storage().ref('images')}
          onUploadStart={this.handleUploadStart}
          onUploadError={this.handleUploadError}
          onUploadSuccess={this.handleUploadSuccess}
          onProgress={this.handleProgress}
        />
      </label>
    );
  }
}

export default AvatarUpload;
