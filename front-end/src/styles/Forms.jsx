import styled from 'styled-components';
import SignUpPageBg from '../img/sign-up-page-bg.png';

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
  /* height: 100vh; */
  /* margin-top: 8em; */
`;
const SignUpContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background: url(${SignUpPageBg});
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  height: 100vh;
`;

const Form = styled.form`
  /* background-color: ${props =>
    props.userType === 'trader' ? props.theme.trader : props.theme.user}; */
  align-self: center;
 
  margin: auto;
  border-radius: 10px;
  min-width: 50%;
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  @media (max-width: 768px) {
    width: 80%;
  }
`;

const SignUpFormStyle = styled(Form)`
  margin: 3em 20px 20px 20px;
  background-color: ${props =>
    props.userType === 'trader' ? props.theme.trader : props.theme.user};
  margin-bottom: 20px;
`;

const SignUpButton = styled.button`
  margin: 20px;
  background: white;
  width: 7em;
  border: none;
  border-radius: 34px;
  padding: 10px;
  &:hover {
    background: ${props => props.theme.deeperLayer};
  }
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

const Select = styled.select`
  border-radius: 5px;
  border: none;
  margin: 5px;
  padding: 10px;
  background: none;
`;

const HalfInput = styled(Input)`
  @media (min-width: 768px) {
    width: 50%;
  }
`;


const ErrorMessage = styled.p`
  background: ${props => props.theme.red};
  color: white;
  padding: 5px;
  margin: 0;
`;

const SignUpOverlay = styled.div`
  position: fixed;
  display: none;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
  cursor: pointer;
`;

export {
  Container,
  Form,
  SignUpFormStyle,
  SignUpButton,
  Inputs,
  Input,
  InputWrapper,
  HalfInput,
  Select,
  SignUpContainer,
  ErrorMessage,
  SignUpOverlay
};
