import React, { Component } from 'react';
import styled from 'styled-components';
import {
  Inputs,
  Input,
  InputWrapper,
  HalfInput,
  Form,
  SignUpButton
} from '../styles/Forms';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { postReview } from '../utils/reviews';

const Container = styled.div`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.75);
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BodyInput = styled.textarea`
  height: 100px;
  border-radius: 5px;
  border: none;
  margin: 5px;
  padding: 10px;
  resize: none;
`;

const ReviewForm = styled(Form)`
  width: 30%;
  color: white;
  background-color: ${props => props.theme.trader};
  padding: 20px;
  position: relative;
  display: block;
`;

const XButton = styled.button`
  position: absolute;
  border-radius: 50%;
  top: -10px;
  color: ${props => props.theme.greytext};
  right: -10px;
  height: 30px;
  width: 30px;
  box-shadow: 1px 0 3px 0 rgb(0, 0, 0, 0.3);
  border: none;
  font-size: 15px;
  background: ${props => props.theme.grey};
  cursor: pointer;
`;

const ScoreInput = styled.input`
  margin: 0;
`;

const ScoreContainer = styled.div`
  text-align: left;
`;

class AddReviewForm extends Component {
  state = {
    user_username: this.props.user_username,
    trader_username: this.props.trader_username,
    heading: '',
    body: '',
    score: 0
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = async e => {
    e.preventDefault();
    const newReview = await postReview(this.state);
    this.props.updateReviews(newReview);
    this.props.handleClick();
  };

  render() {
    return (
      <Container>
        <ReviewForm action="" onSubmit={this.handleSubmit}>
          <h3>Add your review</h3>
          <XButton onClick={this.props.handleClick}>
            <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
          </XButton>
          <Inputs>
            <Input
              name="heading"
              placeholder="Heading"
              type="text"
              onChange={this.handleChange}
            />
            <BodyInput
              name="body"
              placeholder="Write your review here..."
              type="text"
              onChange={this.handleChange}
            />
            <p>Score</p>
            <ScoreContainer>
              {' '}
              <ScoreInput
                type="radio"
                name="score"
                value="1"
                onChange={this.handleChange}
              />{' '}
              1
            </ScoreContainer>
            <ScoreContainer>
              <ScoreInput
                type="radio"
                name="score"
                value="2"
                onChange={this.handleChange}
              />{' '}
              2
            </ScoreContainer>
            <ScoreContainer>
              <ScoreInput
                type="radio"
                name="score"
                value="3"
                onChange={this.handleChange}
              />{' '}
              3
            </ScoreContainer>
            <ScoreContainer>
              <ScoreInput
                type="radio"
                name="score"
                value="4"
                onChange={this.handleChange}
              />{' '}
              4
            </ScoreContainer>
            <ScoreContainer>
              <ScoreInput
                type="radio"
                name="score"
                value="5"
                onChange={this.handleChange}
              />{' '}
              5
            </ScoreContainer>
          </Inputs>

          <SignUpButton>Submit</SignUpButton>
        </ReviewForm>
      </Container>
    );
  }
}

export default AddReviewForm;
