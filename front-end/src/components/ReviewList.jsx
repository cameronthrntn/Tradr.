import React, { Component } from 'react';
import styled from 'styled-components';
import { getReviewsByUsername } from '../utils/reviews';
import ReviewCard from './ReviewCard';

const Container = styled.div`
  background: white;
  color: black;
  height: 200px;
  overflow-y: scroll;
  width: 80%;
  text-align: left;
  margin: 20px;
  padding: 10px;
  border-radius: 10px;
  box-shadow: inset 1px 0 3px 0 rgb(0, 0, 0, 0.3);
`;

class ReviewList extends Component {
  state = {
    reviews: []
  };
  componentDidMount = async () => {
    const reviews = await getReviewsByUsername(this.props.username);
    this.setState({
      reviews
    });
  };
  render() {
    return (
      <Container>
        {this.state.reviews.map(review => {
          return <ReviewCard review={review}></ReviewCard>;
        })}
      </Container>
    );
  }
}

export default ReviewList;
