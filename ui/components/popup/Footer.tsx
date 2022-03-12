import HomeIcon from 'components/shared/HomeIcon'
import Separator from 'components/shared/Separator'
import StarIcon from 'components/shared/StarIcon'
import styled from 'styled-components'

const Footer = () => {
  return (
    <>
      <Separator />
      <Container>
        <Button onClick={() => chrome.tabs.create({ url: 'https://app.writesonic.com' })}>
          <HomeIcon />
          Home
        </Button>
        <Button onClick={() => chrome.tabs.create({ url: 'https://forms.reform.app/writesonic/chrome-feedback/tpfwc3' })}>
          <StarIcon />
          Give Feedback
        </Button>
      </Container>
    </>
  )
}

const Container = styled.footer`
  padding: 24px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Button = styled.div`
  color: #4f46e5;
  font-size: 12px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  cursor: pointer;
`

export default Footer
