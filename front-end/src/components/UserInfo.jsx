import React, { Component } from 'react';
import styled from 'styled-components';
import { AppConsumer } from './AppContext';
import { getAge } from '../utils';
import AvatarUpload from './AvatarUpload';
import ReviewList from '../components/ReviewList';
import { updateProfile } from '../utils/profile-patch';

const Container = styled.div`
  color: white;
  background: ${props =>
    props.user.trade ? props.theme.trader : props.theme.user};
  width: 30%;

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
  border-radius: 50px;
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
  margin: 0px;
  margin: 10px;
`;

const ScoreContainer = styled.div``;

const TraderInfo = styled(Info)``;

const PatchInput = styled.input`
  padding: 10px;

  ::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: black;
    opacity: 1; /* Firefox */
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
  right: -10px;
  height: 30px;
  width: 30px;
`;

const SaveButton = styled.div`
  text-align: center;
  background: lightgray;
  border-radius: 5px;
  border: solid black 1px;
  width: 30%;
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
    console.log(user);

    e.preventDefault();
    updateProfile(this.state.body, user.trade, user.username).then(user => {
      this.setState({ body: {} });
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
    return (
      <AppConsumer>
        {user => {
          return (
            <>
              <Container user={user}>
                <AvatarWrapper>
                  <AvatarImg
                    src={
                      !this.state.newAvatarRef
                        ? user.avatar_ref
                        : this.state.newAvatarRef
                    }
                    alt=""
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
                        <EditButton onClick={this.handleClick}>Edit</EditButton>
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
                          <div>
                            <label htmlFor="first_name">First name:</label>
                            <PatchInput
                              onChange={this.handleChange}
                              id="first_name"
                              placeholder={user.first_name}
                              type="text"
                            />
                          </div>
                          <div>
                            <label htmlFor="last_name">Last name:</label>
                            <PatchInput
                              onChange={this.handleChange}
                              id="last_name"
                              type="text"
                              placeholder={user.last_name}
                            />
                          </div>
                          <div>
                            <label htmlFor="dob">DOB:</label>
                            <PatchInput
                              onChange={this.handleChange}
                              id="dob"
                              type="date"
                            />
                          </div>

                          <SaveButton>Save</SaveButton>
                        </PatchUserForm>
                      </Info>
                    )}
                  </>
                )}
                {user.trade && (
                  <>
                    {!this.state.isEditing ? (
                      <TraderInfo>
                        <EditButton onClick={this.handleClick}>Edit</EditButton>
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
                          <div>
                            <label htmlFor="first_name">First name:</label>
                            <PatchInput
                              onChange={this.handleChange}
                              id="first_name"
                              placeholder={user.first_name}
                              type="text"
                            />
                          </div>
                          <div>
                            <label htmlFor="last_name">Last name:</label>
                            <PatchInput
                              onChange={this.handleChange}
                              id="last_name"
                              placeholder={user.last_name}
                              type="text"
                            />
                          </div>
                          <div>
                            <label htmlFor="dob">DOB:</label>
                            <PatchInput
                              onChange={this.handleChange}
                              id="dob"
                              type="date"
                            />
                          </div>
                          <div>
                            <label htmlFor="trader">
                              Personal website address (Optional):
                            </label>
                            <PatchInput
                              onChange={this.handleChange}
                              id="personal_site"
                              placeholder={user.personal_site}
                              type="text"
                            />
                          </div>
                          <div>
                            <label htmlFor="rate">Rate:</label>
                            <PatchInput
                              onChange={this.handleChange}
                              id="rate"
                              placeholder={user.rate}
                              type="text"
                            />
                            /d
                          </div>

                          <SaveButton>Save</SaveButton>
                        </PatchUserForm>
                      </TraderInfo>
                    )}

                    <ReviewList />
                    <ScoreContainer>
                      Trader Score:{' '}
                      <Score score={user.score}>{user.score}</Score>
                    </ScoreContainer>
                  </>
                )}
              </Container>
            </>
          );
        }}
      </AppConsumer>
    );
  }
}

export default UserInfo;
