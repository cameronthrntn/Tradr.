import React, { Component } from 'react';
import styled from 'styled-components';
import { AppConsumer } from './AppContext';
import { getAge } from '../utils';
import AvatarUpload from './AvatarUpload';
import ReviewList from '../components/ReviewList';
import { updateProfile } from '../utils/profile-patch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
  color: white;

  background: ${props =>
    props.user.trade ? props.theme.trader : props.theme.user};
  width: 30%;
  font-size: 1em;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
  }
  @media (min-width: 768px) {
    min-width: 400px;
  }
`;

const AvatarWrapper = styled.aside`
  width: 6em;
  min-height: 6em;
  border: 4px solid white;
  margin: 5px;
  border-radius: 50%;
  height: 6em;
  position: relative;
`;

const AvatarImg = styled.img`
  width: 100%;
  border-radius: 50%;
`;

const Info = styled.div`
  background: white;
  color: black;
  width: 80%;
  text-align: left;
  margin: 20px;
  padding: 10px;
  border-radius: 10px;
  box-shadow: inset 1px 0 3px 0 rgb(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Score = styled.span`
  color: white;
  font-weight: bold;
  font-size: 2rem;
  margin: 20px;
  border-radius: 50%;
  padding: 10px;
`;

const Infolet = styled.p`
  margin: 5px;
`;

const ScoreContainer = styled.div``;

const TraderInfo = styled(Info)``;

const PatchInput = styled.input`
  padding: 10px;

  ::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: black;
    opacity: 1; /* Firefox */
    font-size: 1.5em;
  }

  :-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: black;
  }

  ::-ms-input-placeholder {
    /* Microsoft Edge */
    color: black;
  }
`;

const PatchUserForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const EditButton = styled.button`
  position: absolute;
  border-radius: 50%;
  top: -10px;
  color: ${props => props.theme.greytext};
  right: -10px;
  height: 30px;
  width: 30px;
  box-shadow: 1px 0 3px 0 rgb(0, 0, 0, 0.3);
  border: none;
  background: ${props => props.theme.grey};
  cursor: pointer;
`;

const SaveButton = styled.button`
  text-align: center;
  background: ${props => props.theme.grey};
  border-radius: 5px;
  margin: 10px;
  width: 30%;
`;

const SaveButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const HeadingContainer = styled.div`
  display: flex;
  margin: 0px;
`;

class UserInfo extends Component {
  state = {
    newAvatarRef: '',
    isEditing: false,
    body: {},
    isTrader: true
  };

  handleChange = e => {
    this.setState({
      body: { ...this.state.body, [e.target.id]: e.target.value }
    });
  };

  handleSubmit = (e, user) => {
    e.preventDefault();
    updateProfile(this.state.body, user.trade, user.username).then(user => {
      this.props.updateUserInfo(this.state.body);
      this.setState({ body: {}, isEditing: false });
    });
  };

  handleClick = e => {
    e.preventDefault();
    this.setState({ isEditing: true });
  };

  updateAvatar = newAvatarRef => {
    this.setState({ newAvatarRef });
  };
  render() {
    const user = this.props.user;
    return (
      <Container user={user}>
        <AvatarWrapper>
          <AvatarImg
            src={
              !this.state.newAvatarRef
                ? user.avatar_ref
                : this.state.newAvatarRef
            }
            alt="user avatar image"
          />
          <AvatarUpload
            updateAvatar={this.updateAvatar}
            trader={user.trade}
            username={user.username}
          />
        </AvatarWrapper>

        <p>{user.username}</p>

        {!user.trade && (
          <>
            {!this.state.isEditing ? (
              <Info>
                <EditButton onClick={this.handleClick}>
                  <FontAwesomeIcon icon={faPencilAlt} />
                </EditButton>
                <Infolet>
                  {user.first_name} {user.last_name}
                </Infolet>
                <Infolet>{getAge(new Date(user.dob))}</Infolet>
              </Info>
            ) : (
              <Info>
                <PatchUserForm
                  onSubmit={e => {
                    this.handleSubmit(e, user);
                  }}
                >
                  <label htmlFor="first_name">First name:</label>
                  <PatchInput
                    onChange={this.handleChange}
                    id="first_name"
                    placeholder={user.first_name}
                    type="text"
                  />

                  <label htmlFor="last_name">Last name:</label>
                  <PatchInput
                    onChange={this.handleChange}
                    id="last_name"
                    type="text"
                    placeholder={user.last_name}
                  />

                  <label htmlFor="dob">DOB:</label>
                  <PatchInput
                    onChange={this.handleChange}
                    id="dob"
                    type="date"
                  />
                  <SaveButtonWrapper>
                    <SaveButton>Save</SaveButton>
                  </SaveButtonWrapper>
                </PatchUserForm>
              </Info>
            )}
          </>
        )}
        {user.trade && (
          <>
            {!this.state.isEditing ? (
              <TraderInfo>
                <EditButton onClick={this.handleClick}>
                  <FontAwesomeIcon icon={faPencilAlt} />
                </EditButton>
                <Infolet>
                  {user.first_name} {user.last_name}
                </Infolet>
                <Infolet>{getAge(new Date(user.dob))}</Infolet>
                <Infolet>{user.trade}</Infolet>
                <Infolet>{user.personal_site}</Infolet>
                <Infolet>{user.rate}/d</Infolet>
              </TraderInfo>
            ) : (
              <TraderInfo>
                <PatchUserForm
                  action=""
                  onSubmit={e => {
                    this.handleSubmit(e, user);
                  }}
                >
                  <label htmlFor="first_name">First name:</label>
                  <PatchInput
                    onChange={this.handleChange}
                    id="first_name"
                    placeholder={user.first_name}
                    type="text"
                  />
                  <label htmlFor="last_name">Last name:</label>
                  <PatchInput
                    onChange={this.handleChange}
                    id="last_name"
                    placeholder={user.last_name}
                    type="text"
                  />
                  <label htmlFor="dob">DOB:</label>
                  <PatchInput
                    onChange={this.handleChange}
                    id="dob"
                    type="date"
                  />
                  <label htmlFor="trader">
                    Personal website address (Optional):
                  </label>
                  <PatchInput
                    onChange={this.handleChange}
                    id="personal_site"
                    placeholder={user.personal_site}
                    type="text"
                  />
                  <label htmlFor="rate">Rate:</label>
                  <div>
                    <PatchInput
                      onChange={this.handleChange}
                      id="rate"
                      placeholder={user.rate}
                      type="text"
                    />
                    /d
                  </div>

                  <SaveButtonWrapper>
                    <SaveButton>Save</SaveButton>
                  </SaveButtonWrapper>
                </PatchUserForm>
              </TraderInfo>
            )}
            <HeadingContainer>
              <h3>Reviews</h3>
            </HeadingContainer>
            <ReviewList username={user.username} />
            <ScoreContainer>
              Trader Score: <Score score={user.score}>{user.score}</Score>
            </ScoreContainer>
          </>
        )}
      </Container>
    );
  }
}

export default UserInfo;
