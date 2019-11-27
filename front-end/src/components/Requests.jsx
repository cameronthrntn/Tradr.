import React, { Component } from 'react';
import { getTraderRequests } from '../utils/traders';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { dateFormatter } from '../utils/helper-funcs';
import { replyRequest } from '../utils/traders';
import { navigate } from '@reach/router';
import { getCity } from '../utils/makeAccount';

const Container = styled.div`
  position: relative;
`;

const Modal = styled.div`
  position: fixed;
  background: white;
  border-radius: 5px;
  color: ${props => props.theme.greytext};
  width: 50%;
  @media (max-width: 768px) {
    width: 98vw;
  }
  height: 50%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  z-index: 10000;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow-y: scroll;
  overflow-x: hidden;
  box-shadow: 1px 5px 5px ${props => props.theme.deeperLayer};
`;

const XButton = styled.button`
  position: absolute;
  border-radius: 50%;
  top: 5px;
  color: ${props => props.theme.greytext};
  right: 5px;
  height: 30px;
  width: 30px;
  box-shadow: 1px 0 3px 0 rgb(0, 0, 0, 0.3);
  border: none;
  font-size: 15px;
  background: ${props => props.theme.grey};
  cursor: pointer;
`;

const SaveButton = styled.button`
  background: ${props => props.theme.user};
  border: none;
  padding: 10px;
  font-weight: bold;
  font-size: 1.3rem;
  border-radius: 5px;
  color: white;
  box-shadow: 1px 5px 5px ${props => props.theme.trader_dark};
  &:hover {
    background: ${props => props.theme.user_dark};
    box-shadow: none;
    cursor: pointer;
  }
`;
const ProjectImage = styled.img`
  width: 90%;
`;
const RequestList = styled.ul`
  width: 100%;
  height: 100%;
  padding: 0;
  list-style: none;
`;
const Request = styled.li`
  width: 100%;
  padding: 20px;
  @media (max-width: 768px) {
    padding: 2%;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${props => props.theme.grey};
`;
const ImageWrapper = styled.div`
  width: 30%;
`;
const RequestInfo = styled.section`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;
const RequestButtons = styled.div`
  width: 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ProjectTitle = styled.h2`
  color: ${props => props.theme.trader};
  margin: 0;
`;

const Timeline = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Requestee = styled.h3`
  color: ${props => props.theme.user};
`;

const RecievedDate = styled.p`
  margin: 0;
`;

const StartDate = styled.p`
  color: ${props => props.theme.trader};
`;

const EndDate = styled.p`
  color: ${props => props.theme.user};
`;

const Location = styled.p`
  font-weight: bold;
`;

const ReqButton = styled.button`
  border-radius: 50%;
  font-size: 2rem;
  margin-bottom: 50px;
  width: 50px;
  height: 50px;
  background: none;
  border: 2px solid ${props => props.theme.trader};
  color: ${props => props.theme.trader};
  transition: 0.3s;
  cursor: pointer;
  &:hover {
    background: ${props => props.theme.trader};
    color: white;
    transition: 0.3s;
  }
`;

const Decline = styled(ReqButton)`
  border: 2px solid ${props => props.theme.user};
  color: ${props => props.theme.user};
  &:hover {
    background: ${props => props.theme.user};
    color: white;
    transition: 0.3s;
  }
`;

class Requests extends Component {
  state = {
    requests: [],
    isViewingJobs: false
  };
  reply = async e => {
    const project_id = e.target.name;
    const accepted = e.target.value ? true : false;
    const request_id = e.target.id;
    await replyRequest({
      request_id,
      accepted,
      trader_username: this.props.user,
      project_id
    });
    !accepted
      ? await this.setState(curr => {
          return {
            requests: curr.requests.filter(
              request => request.request_id != request_id
            )
          };
        })
      : navigate(`/project/${project_id}`);
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
        {requests.length > 0 ? (
          <SaveButton onClick={this.handleBool}>
            You currently have {`${requests.length}`} open project requests!
          </SaveButton>
        ) : (
          <p>{`You don't currently have any open project requests`}</p>
        )}

        {isViewingJobs ? (
          <Modal>
            <XButton onClick={this.handleBool}>
              <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
            </XButton>
            <RequestList>
              {requests.map(request => {
                return (
                  <Request key={request.project_id}>
                    <ImageWrapper>
                      <ProjectImage src={request.path} alt="" />
                    </ImageWrapper>
                    <RequestInfo>
                      <ProjectTitle>{request.title}</ProjectTitle>
                      <Requestee>{request.user_username}</Requestee>
                      <Location>{request.city}</Location>
                      <RecievedDate>
                        Recieved: {dateFormatter(request.posted)}
                      </RecievedDate>
                      <Timeline>
                        <StartDate>
                          Start: {dateFormatter(request.start_date)}
                        </StartDate>
                        <EndDate>
                          End: {dateFormatter(request.end_date)}
                        </EndDate>
                      </Timeline>
                    </RequestInfo>
                    <RequestButtons>
                      <ReqButton
                        name={request.project_id}
                        value="true"
                        id={request.request_id}
                        onClick={this.reply}
                      >
                        ✓
                      </ReqButton>
                      <Decline
                        name={request.project_id}
                        value=""
                        id={request.request_id}
                        onClick={this.reply}
                      >
                        ✗
                      </Decline>
                    </RequestButtons>
                  </Request>
                );
              })}
            </RequestList>
          </Modal>
        ) : null}
      </Container>
    );
  }
}

export default Requests;
