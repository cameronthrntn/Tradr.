import React, { Component } from 'react';
import styled from 'styled-components';
import { getReviewsByUsername } from '../utils/reviews';
import ReviewCard from './ReviewCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import AddReviewForm from './AddReviewForm';
import { AppConsumer } from './AppContext';

const Container = styled.div`
  background: white;
  color: black;
  height: 150px;

  padding: 10px;
  text-align: left;
  overflow-y: scroll;
  border-radius: 10px;
  box-shadow: inset 1px 0 3px 0 rgb(0, 0, 0, 0.3);
`;

const AddReviewButton = styled.button`
  position: absolute;
  border-radius: 34px;
  top: -10px;
  color: ${props => props.theme.greytext};
  right: -10px;
  height: 30px;
  width: 100px;
  box-shadow: 1px 0 3px 0 rgb(0, 0, 0, 0.3);
  border: none;
  background: ${props => props.theme.grey};
  cursor: pointer;
`;
const ButtonHolder = styled.div`
  position: relative;
  margin: 20px;
  width: 80%;
  border-radius: 10px;
`;

class ReviewList extends Component {
  state = {
    reviews: [],
    isAddingReview: false
  };
  componentDidMount = async () => {
    const reviews = await getReviewsByUsername(this.props.username);
    this.setState({
      reviews
    });
  };
  handleClick = e => {
    this.setState(currentState => {
      return { isAddingReview: !currentState.isAddingReview };
    });
  };
  updateReviews = newReview => {
    this.setState(currentState => {
      return { reviews: [...currentState.reviews, newReview] };
    });
  };

  render() {
    return (
      <AppConsumer>
        {user => {
          return (
            <ButtonHolder>
              {this.state.isAddingReview && (
                <AddReviewForm
                  trader_username={this.props.username}
                  user_username={user.username}
                  handleClick={this.handleClick}
                  updateReviews={this.updateReviews}
                />
              )}
              <AddReviewButton onClick={this.handleClick}>
                <FontAwesomeIcon icon={faPlus} />
                &nbsp; Add review
              </AddReviewButton>
              <Container>
                {this.state.reviews.map(review => {
                  return <ReviewCard review={review}></ReviewCard>;
                })}
              </Container>
            </ButtonHolder>
          );
        }}
      </AppConsumer>
    );
  }
}

export default ReviewList;
