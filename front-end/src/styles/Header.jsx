import styled from 'styled-components';

const Nav = styled.nav`
  background: white;
  height: 70px;

  width: 100%;
  z-index: 2;
  box-shadow: 0 4px 8px -2px gray;
  display: flex;
  justify-content: space-between;
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
