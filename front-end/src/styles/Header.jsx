import styled from 'styled-components';

const Nav = styled.nav`
  background: white;
  height: 70px;
  width: 100%;
  position: fixed;
  z-index: 1000000;
  box-shadow: 1px 0 10px 0 rgb(0, 0, 0, 0.3);
  display: flex;
  justify-content: space-between;
`;

const NavLogo = styled.div`
  margin-left: 3vw;
  font-family: gilbert, sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 3rem;
  @media (max-width: 321px) {
    font-size: 1.7rem;
    margin-top: 15px;
  }
`;

const LogoHead = styled.p`
  font-family: gilbert, sans-serif;
  color: ${props => props.theme.trader};
  float: left;
  margin: 0;
`;

const LogoBody = styled.p`
  font-family: gilbert, sans-serif;
  color: ${props => props.theme.user};
  float: left;
  margin: 0;
`;

const Username = styled.div`
  /* @media (max-width: 321px) {
    display: none;
  } */
`;

const SignOutButton = styled.button`
  border-radius: 34px;
  width: 80px;
  height: 40px;
  color: white;
  border: none;
  font-size: 15px;
  font-weight: bold;
  box-shadow: 1px 0 10px 0 rgb(0, 0, 0, 0.3);
  cursor: pointer;
  background: ${props =>
    props.user.trade ? props.theme.trader : props.theme.user};
  &:hover {
    background: ${props =>
      props.user.trade ? props.theme.trader_dark : props.theme.user_dark};
  }
`;

const LoggedInUser = styled.div`
  margin: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 200px;
`;

export {
  Nav,
  NavLogo,
  LogoHead,
  LogoBody,
  SignOutButton,
  LoggedInUser,
  Username
};
