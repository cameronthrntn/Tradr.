import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background: white;
  color: black;
  min-height: 200px;
  overflow-y: scroll;
  width: 90%;
  text-align: left;
  margin: 20px;
  padding: 10px;
  border-radius: 10px;
  box-shadow: inset 1px 0 3px 0 rgb(0, 0, 0, 0.3);
`;

class ReviewList extends Component {
  render() {
    return <Container>REVIEW LIST</Container>;
  }
}

export default ReviewList;
