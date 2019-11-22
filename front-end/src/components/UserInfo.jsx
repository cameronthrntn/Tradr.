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
  width: 90%;
  text-align: left;
  margin: 20px;
  padding: 10px;
  border-radius: 10px;
  box-shadow: inset 1px 0 3px 0 rgb(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
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
`;

class UserInfo extends Component {
  state = {
    newAvatarRef: '',
    isEditing: true,
    body: {},
    isTrader: true
  };

  handleChange = e => {
    this.setState({
      body: { ...this.state.body, [e.target.name]: e.target.value }
    });
  };

  handleSubmit = (e, user) => {
    console.log(user);

    e.preventDefault();
    updateProfile(this.state.body, user.trade, user.username).then(user => {
      this.setState({ body: {} });
    });
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
                        <Infolet>
                          {user.first_name} {user.last_name}
                        </Infolet>
                        <Infolet>{getAge(new Date(user.dob))}</Infolet>
                      </Info>
                    ) : (
                      <Info>
                        <form
                          onSubmit={e => {
                            this.handleSubmit(e, user);
                          }}
                        >
                          <PatchInput
                            onChange={this.handleChange}
                            name="first_name"
                            placeholder={user.first_name}
                            type="text"
                          />
                          <PatchInput
                            onChange={this.handleChange}
                            name="last_name"
                            type="text"
                            placeholder="Last name"
                          />
                          <PatchInput
                            onChange={this.handleChange}
                            name="dob"
                            type="date"
                          />

                          <button>I AM A BUTTON!!!</button>
                        </form>
                      </Info>
                    )}
                  </>
                )}
                {user.trade && (
                  <>
                    {!this.state.isEditing ? (
                      <TraderInfo>
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
                        <form
                          action=""
                          onSubmit={e => {
                            this.handleSubmit(e, user);
                          }}
                        >
                          <PatchInput
                            onChange={this.handleChange}
                            name="first_name"
                            placeholder={user.first_name}
                            type="text"
                          />
                          <PatchInput
                            onChange={this.handleChange}
                            name="last_name"
                            placeholder={user.last_name}
                            type="text"
                          />
                          <PatchInput
                            onChange={this.handleChange}
                            name="dob"
                            type="date"
                          />
                          <PatchInput
                            onChange={this.handleChange}
                            name="trade"
                            placeholder={user.trade}
                            type="text"
                          />
                          <PatchInput
                            onChange={this.handleChange}
                            name="personal_site"
                            placeholder={user.personal_site}
                            type="text"
                          />
                          <PatchInput
                            onChange={this.handleChange}
                            name="rate"
                            placeholder={`${user.rate}/d`}
                            type="text"
                          />
                          <button>I AM A BUTTON!!!</button>
                        </form>
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
