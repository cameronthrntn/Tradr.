import styled from 'styled-components';
import LandingPageUser from '../img/landing-page-user.png';
import LandingPageTrader from '../img/landing-page-trader.png';

const Page = styled.div`
  color: ${props => props.theme.trader};
  display: flex;
  justify-content: space-between;
  height: 100%;
  overflow-y: scroll;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Info = styled.div`
  font-size: 3rem;
  font-weight: bold;
  background: white;
  margin: 30px;
  border: solid black 4px;
  padding: 20px;
  box-shadow: -10px 10px 0px -2px rgba(0, 0, 0, 1);
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const ExampleWrapper = styled.div`
  height: 100vh;
  width: 100%;
  color: white;
  font-weight: bolder;

  p {
    margin: 0;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;
const UserWrapper = styled(ExampleWrapper)`
  background: url(${LandingPageUser});
  background-size: cover;
  background-position: center;
  color: ${props => props.theme.user};
`;
const TraderWrapper = styled(ExampleWrapper)`
  color: ${props => props.theme.trader};
  background: url(${LandingPageTrader});
  background-size: cover;
  background-position: center;
`;

const LoginSide = styled.aside`
  min-width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 1px 0 10px 0 rgb(0, 0, 0, 0.3);
  @media (max-width: 768px) {
    width: 100%;
    min-width: 0px;
  }
`;

const Header = styled.header`
  font-size: 10rem;
  font-weight: bolder;
  @media (max-width: 768px) {
    font-size: 8rem;
  }
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
    border: solid 3px ${props => props.theme.trader_dark};
    background: ${props => props.theme.trader_dark};
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
  TraderWrapper,
  Info
};
