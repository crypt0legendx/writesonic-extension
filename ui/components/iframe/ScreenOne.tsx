import Footer from 'components/iframe/Footer'
import { Dispatch, SetStateAction } from 'react'
import styled from 'styled-components'

interface Props {
  setView: Dispatch<SetStateAction<number>>
  setFeature: Dispatch<SetStateAction<string>>
}

const ScreenOne = ({ setView, setFeature }: Props) => {
  return (
    <Container>
      <Feature
        onClick={() => {
          setFeature('rephrase')
          setView(2)
        }}
      >
        <img src={chrome.runtime.getURL('assets/img/rewrite.svg')} />
        <FeatureText>Rewrite</FeatureText>
      </Feature>
      <Feature
        onClick={() => {
          setFeature('expand')
          setView(2)
        }}
      >
        <img src={chrome.runtime.getURL('assets/img/expand.svg')} />
        <FeatureText>Expand</FeatureText>
      </Feature>
      <Feature
        onClick={() => {
          setFeature('shorten')
          setView(2)
        }}
      >
        <img src={chrome.runtime.getURL('assets/img/shorten.svg')} />
        <FeatureText>Shorten</FeatureText>
      </Feature>
      <Footer notSupported={false} />
    </Container>
  )
}

const Container = styled.div`
  width: 372px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.04), 0px 11px 22px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background-color: #fff;
  margin-top: -2px;
  margin-left: 5px;
`

const Feature = styled.div`
  padding: 14px 0;
  width: 33%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid rgba(107, 114, 128, 0.08);
  transition: all 0.2s;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
  &:first-child,
  &:nth-child(2) {
    border-right: 1px solid rgba(107, 114, 128, 0.08);
  }
`

const FeatureText = styled.span`
  color: #6b7280;
  font-size: 14px;
  margin-left: 5px;
`

export default ScreenOne
