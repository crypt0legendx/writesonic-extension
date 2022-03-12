import styled from 'styled-components'

const Error = () => {
  return (
    <ErrorContainer>
      <img src={chrome.runtime.getURL('assets/img/error-saly.png')} />
      <ErrorText>
        <strong>Uh-oh!</strong> Something went wrong on our side. Try to reload
        the page and run the extention again.
      </ErrorText>
    </ErrorContainer>
  )
}

const ErrorContainer = styled.div`
  width: 386px;
  height: 111px;
  background-color: transparent;
  background: url('assets/img/error-background.png');
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-radius: 6px;
`

const ErrorText = styled.span`
  font-family: 'Inter', sans-serif;
  width: 223px;
  height: 63px;
  font-size: 14px;
  line-height: 21px;
  color: #fff;
`

export default Error
