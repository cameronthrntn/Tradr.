import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: white;
  height: 100vh;
`;

const Form = styled.form`
  border: solid purple 1px;
  max-width: 500px;

  align-self: center;
  margin: 3em 20px 20px 20px;
`;

const LogInButton = styled.button`
  margin: 5px;
  width: 7em;
  border-radius: 34px;
  padding: 10px;
`;

const Inputs = styled.div`
  display: flex;
  padding: 10px;
  flex-direction: column;
  &input {
    margin: 5px;
  }
`;

const Input = styled.input`
  margin: 5px;
  padding: 10px;
`;

export default class LoginForm extends Component {
  render() {
    return (
      <>
        <Container>
          <Form action="">
            <Inputs>
              <Input type="text" placeholder="Username" />
              <Input type="text" placeholder="Password" />
            </Inputs>

            <LogInButton>Log in</LogInButton>
          </Form>
        </Container>
      </>
    );
  }
}
