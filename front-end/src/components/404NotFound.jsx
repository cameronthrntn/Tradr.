import React from 'react';
import styled from 'styled-components';
import Head from '../Head.svg';

const ErrorPage = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;
const HeadImg = styled.img`
  width: 20%;
`;
const ErrorMessage = styled.h2`
  text-align: center;
  color: ${props => props.theme.trader};
`;

const QuestionMark = styled(ErrorMessage)`
  font-size: 200px;
  margin: 0;
  -webkit-text-stroke: 10px black;
  @media (max-width: 768px) {
    -webkit-text-stroke: 2px black;

    font-size: 50px;
  }
`;

export default function NotFound({ code, message }) {
  return (
    <ErrorPage>
      {code === 404 && <QuestionMark>?</QuestionMark>}
      {code === 403 && <QuestionMark>!</QuestionMark>}
      <HeadImg src={Head} alt="" />
      <ErrorMessage>{message}</ErrorMessage>
    </ErrorPage>
  );
}
