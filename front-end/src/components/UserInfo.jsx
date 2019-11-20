import React, { Component } from 'react';
import styled from 'styled-components';

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
  state = {
    username: this.props.username,
    avatar_ref: null,
    first_name: 'Aaron',
    last_name: 'Stanton',
    dob: '12/12/1984',
    trade: 'plumber',
    personal_site: 'www.flyingkitlets.co.uk',
    rate: 120
  };
  componentDidMount() {
    //make request to api for userinfo
  }
  render() {
    return (
      <Container>
        <AvatarWrapper>
          <img src="" alt="" />
        </AvatarWrapper>
        <p>{this.state.username}</p>
        <Info>
          <p>
            {this.state.first_name} {this.state.last_name}
          </p>

          <p>{this.state.dob}</p>
        </Info>
        {this.state.trade && (
          <TraderInfo>
            <p>{this.state.trade}</p>
            <p>{this.state.personal_site}</p>
            <p>{this.state.rate}</p>
          </TraderInfo>
        )}
      </Container>
    );
  }
}

export default UserInfo;
