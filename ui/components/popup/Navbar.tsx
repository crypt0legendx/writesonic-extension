import styled from 'styled-components'

const Navbar = () => {
  return (
    <StyledNav>
      <Logo src={chrome.runtime.getURL('assets/img/logo.png')} />
      <Text>for Chrome</Text>
    </StyledNav>
  )
}

const StyledNav = styled.nav`
  display: flex;
  align-items: center;
  height: 70px;
  padding: 0 32px;
  border-bottom: 1px solid rgba(107, 114, 128, 0.1);
`

const Logo = styled.img`
  height: 23px;
  margin-top: -0.5px;
`

const Text = styled.span`
  color: #4f46e5;
  font-family: Inter;
  font-size: 12px;
  font-weight: 800;
  padding: 0 4px;
`

export default Navbar
