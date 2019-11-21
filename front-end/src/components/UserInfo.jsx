import React, { Component } from 'react';
import styled from 'styled-components';
import { AppConsumer } from './AppContext';
import { getAge } from '../utils';
import ReviewList from '../components/ReviewList';

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
`;

const ScoreContainer = styled.div``;

const TraderInfo = styled(Info)``;

class UserInfo extends Component {
  componentDidMount() {
    //make request to api for userinfo
  }
  render() {
    return (
      <AppConsumer>
        {user => {
          return (
            <>
              <Container user={user}>
                <AvatarWrapper>
                  <img src="" alt="" />
                </AvatarWrapper>
                <p>{user.username}</p>

                {!user.trade && (
                  <Info>
                    <p>
                      {user.first_name} {user.last_name}
                    </p>
                    <p>{getAge(new Date(user.dob))}</p>
                  </Info>
                )}
                {user.trade && (
                  <>
                    <TraderInfo>
                      <Infolet>
                        {user.first_name} {user.last_name}
                      </Infolet>
                      <hr />
                      <Infolet>{getAge(new Date(user.dob))}</Infolet>
                      <hr />
                      <Infolet>{user.trade}</Infolet>
                      <hr />
                      <Infolet>{user.personal_site}</Infolet>
                      <hr />
                      <Infolet>{user.rate}/d</Infolet>
                    </TraderInfo>

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
