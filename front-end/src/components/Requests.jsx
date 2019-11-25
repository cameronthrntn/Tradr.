import React, { Component } from 'react';
import { getTraderRequests } from '../utils/traders';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { dateFormatter } from '../utils/helper-funcs';

const Container = styled.div`
  position: relative;
`;

const Modal = styled.div`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.75);
  width: 50%;
  height: 50%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const XButton = styled.button`
  position: absolute;
  border-radius: 50%;
  top: -10px;
  color: ${props => props.theme.greytext};
  right: -10px;
  height: 30px;
  width: 30px;
  box-shadow: 1px 0 3px 0 rgb(0, 0, 0, 0.3);
  border: none;
  font-size: 15px;
  background: ${props => props.theme.grey};
  cursor: pointer;
`;

const SaveButton = styled.button`
  text-align: center;
  background: ${props => props.theme.grey};
  border-radius: 5px;
  margin: auto;
  width: 100%;
  animation: bounce 2s infinite;

  @keyframes bounce {
    0%,
    20%,
    50%,
    80%,
    100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-10px);
    }
    60% {
      transform: translateY(-15px);
    }
  }
`;

class Requests extends Component {
  state = {
    requests: [],
    isViewingJobs: false
  };
  handleBool = e => {
    this.setState(currentState => {
      return { isViewingJobs: !currentState.isViewingJobs };
    });
  };

  componentDidMount = async () => {
    const requests = await getTraderRequests(this.props.user);
    this.setState({ requests });
  };
  render() {
    const { requests, isViewingJobs } = this.state;
    return (
      <Container>
        <p>
          {`You currently have ${requests.length} job ${
            requests.length === 1 ? 'request' : 'requests'
          }`}
        </p>
        {requests.length > 0 ? (
          <SaveButton onClick={this.handleBool}>
            Click here for {`${requests.length === 1 ? 'job' : 'jobs'}`}
          </SaveButton>
        ) : null}

        {isViewingJobs ? (
          <Modal>
            <XButton onClick={this.handleBool}>
              <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
            </XButton>
            <ul>
              {requests.map(request => {
                return (
                  <li key={request.project_id}>
                    <h2>Job Vendor: {request.user_username}</h2>
                    <h3>Project Name: {request.title}</h3>
                    <p>Start Date: {dateFormatter(request.start_date)}</p>
                    <p>End Date: {dateFormatter(request.end_date)}</p>
                    <p>Date Posted: {dateFormatter(request.posted)}</p>
                    <p>Location: </p>
                  </li>
                );
              })}
            </ul>
          </Modal>
        ) : null}
      </Container>
    );
  }
}

export default Requests;
