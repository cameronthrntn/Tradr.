import styled from 'styled-components';

const Page = styled.div`
  color: ${props => props.theme.trader};
  display: flex;
`;
const ExampleWrapper = styled.div`
  height: 100vh;
  width: 60%;
  color: white;
  font-weight: bolder;
  font-size: 10rem;
  p {
    margin: 0;
  }
`;
const UserWrapper = styled(ExampleWrapper)`
  background: ${props => props.theme.user};
`
const TraderWrapper = styled(ExampleWrapper)`
  background: ${props => props.theme.trader};
`

const LoginSide = styled.aside`
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Header = styled.header`
  font-size: 10rem;
  font-weight: bolder;
`;
const LogInWrapper = styled.div`
  color: white;
`;

const LogInButton = styled.button`
  margin: 3em;
  background: ${props => props.theme.trader};
  color: white;
  border: solid 3px ${props => props.theme.trader};
  padding: 1em;
  width: 15em;
  border-radius: 34px;
  cursor: pointer;
  &:hover {
    background: white;
    color: ${props => props.theme.trader};
  }
`;

const LogInSection = styled.div`
  width: 50%;
`;
const SignUpSection = styled.div`
  width: 50%;
`;

export {
  Page,
  ExampleWrapper,
  LogInWrapper,
  LogInButton,
  LogInSection,
  SignUpSection,
  LoginSide,
  Header,
  UserWrapper,
  TraderWrapper
};
