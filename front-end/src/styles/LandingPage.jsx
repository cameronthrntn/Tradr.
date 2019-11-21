import styled from 'styled-components';

const Page = styled.div`
  color: ${props => props.theme.trader};
  display: flex;
`;
const ExampleWrapper = styled.div`
  background: ${props => props.theme.trader};
  height: 100vh;
  width: 60%;
`;

const LogInWrapper = styled.div`
  color: white;
  height: 100%;
  height: 100vh;
  width: 40%;
  margin-top: 8em;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const LogInButton = styled.button`
  margin: 3em;
  background: ${props => props.theme.trader};
  color: white;
  border: solid 3px ${props => props.theme.trader};
  padding: 1em;
  width: 15em;
  border-radius: 34px;
  &:hover {
    background: white;
    color: ${props => props.theme.trader};
  }
`;

export { Page, ExampleWrapper, LogInWrapper, LogInButton };
