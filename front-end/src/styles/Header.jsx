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

export { Nav, NavLogo, LogoHead, LogoBody };
