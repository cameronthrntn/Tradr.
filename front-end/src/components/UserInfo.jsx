import React, { Component } from 'react';
import styled from 'styled-components';
import { AppConsumer } from './AppContext';

const Container = styled.div`
  border: solid 1px purple;
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const AvatarWrapper = styled.aside`
  width: 6em;
  border: 4px solid #fe7e0f;
  margin: 5px;
  border-radius: 50px;
  height: 6em;
`;

const Info = styled.div`
  border: solid blue 1px;
  width: 90%;
  text-align: left;
`;

const TraderInfo = styled(Info)`
  border: solid orange 1px;
`;

class UserInfo extends Component {
  componentDidMount() {
    //make request to api for userinfo
  }
  render() {
    return (
      <Container>
        <AppConsumer>
          {user => {
            return (
              <>
                <AvatarWrapper>
                  <img src="" alt="" />
                </AvatarWrapper>
                <p>{user.username}</p>
                <Info>
                  <p>
                    {user.first_name} {user.last_name}
                  </p>

                  <p>{user.dob}</p>
                </Info>
                {user.trade && (
                  <TraderInfo>
                    <p>{user.trade}</p>
                    <p>{user.personal_site}</p>
                    <p>{user.rate}</p>
                  </TraderInfo>
                )}
              </>
            );
          }}
        </AppConsumer>
      </Container>
    );
  }
}

export default UserInfo;
