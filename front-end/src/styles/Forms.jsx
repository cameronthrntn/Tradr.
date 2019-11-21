import styled from 'styled-components';

const InputWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: stretch;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: white;
  height: 100vh;
  margin-top: 8em;
`;

const Form = styled.form`
  background-color: ${props =>
    props.userType === 'trader' ? props.theme.trader : props.theme.user};
  align-self: center;
  margin: 3em 20px 20px 20px;
  border-radius: 10px;
  min-width: 50%;
  margin: auto;
  text-align: center;
  align-items: center;
  @media (max-width: 768px) {
    width: 80%;
  }
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
  border-radius: 5px;
  border: none;
  margin: 5px;
  padding: 10px;
`;

const HalfInput = styled(Input)`
  @media (min-width: 768px) {
    width: 50%;
  }
`;

export { Container, Form, LogInButton, Inputs, Input, InputWrapper, HalfInput };
