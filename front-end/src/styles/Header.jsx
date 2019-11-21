import styled from 'styled-components';

const Nav = styled.nav`
  background: white;
  height: 6vh;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 10;
  box-shadow: 0 4px 8px -2px gray;
  display: flex;
`;

const NavLogo = styled.div`
  margin-left: 3vw;
  font-family: gilbert-color, sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 3rem;
`;

const LogoHead = styled.p`
  color: ${props => props.theme.trader};
  float: left;
  margin: 0;
`;

const LogoBody = styled.p`
  color: ${props => props.theme.user};
  float: left;
  margin: 0;
`;

export { Nav, NavLogo, LogoHead, LogoBody };
