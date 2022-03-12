import styled from 'styled-components'

const Enable = () => (
  <EnableContainer>
    <Title>Sign up to unlock key features</Title>
    <FeatureList>
      <FeatureText>Personal Dashboard</FeatureText>
      <FeatureText>Save and access your documents</FeatureText>
      <FeatureText>Get weekly writing statistics and tips</FeatureText>
    </FeatureList>
    <Button
      href={`${import.meta.env.VITE_FRONT_END_BASE_URL}/login`}
      target="_blank"
    >
      Sign in
    </Button>
    <SignUpContainer>
      <span>Don&apos;t have an account?</span>{' '}
      <SignUpButton
        href={`${import.meta.env.VITE_FRONT_END_BASE_URL}/signup`}
        target="_blank"
      >
        Sign up
      </SignUpButton>
    </SignUpContainer>
  </EnableContainer>
)

const EnableContainer = styled.div`
  padding: 16px 32px 24px;
  display: flex;
  flex-direction: column;
`

const SignUpContainer = styled.div`
  color: #6b7280;
  font-size: 12px;
`

const SignUpButton = styled.a`
  color: #544be6;
  text-decoration: none;
`

const Title = styled.h1`
  font-family: 'Inter', sans-serif;
  font-weight: 800;
  font-size: 16px;
  color: #111827;
  margin-bottom: 8px;
`

const FeatureList = styled.ul`
  list-style: none;
`

const FeatureText = styled.li`
  color: #6b7280;
  font-family: Inter;
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 4px 0;
  height: 20px;
  &::before {
    content: '•';
    color: #8dc546;
    font-size: 30px;
    width: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: -4px;
  }
`

const Button = styled.a`
  margin: 24px 0 15px;
  height: 40px;
  font-size: 14px;
  background-color: #ec4899;
  color: white;
  border: none;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 6px;
  display: grid;
  place-items: center;
  text-decoration: none;
  &:hover {
    background-color: #c53d80;
  }
`

export default Enable
