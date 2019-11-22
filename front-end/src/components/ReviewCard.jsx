import React from 'react';
import styled from 'styled-components';
import { ratingBgColorChooser } from '../utils/index';

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Rating = styled.div`
  color: ${props => ratingBgColorChooser(props.score)};
`;

const ReviewCard = props => {
  return (
    <div>
      <ReviewHeader>
        <p>{props.review.user_username}</p>
        <p>{new Date(props.review.posted).toLocaleString().split(',')[0]}</p>
      </ReviewHeader>
      <h5>{props.review.heading}</h5>
      <Rating score={props.review.score}>{props.review.score}</Rating>
      <p>{props.review.body}</p>
      <hr />
    </div>
  );
};

export default ReviewCard;
