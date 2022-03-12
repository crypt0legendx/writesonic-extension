import Footer from 'components/iframe/Footer'
import ClipboardIcon from 'components/shared/ClipboardIcon'
import Separator from 'components/shared/Separator'
import useGetVoices from 'hooks/useGetVoices'
import useGetLeftCredits from 'hooks/useGetLeftCredits'
import { Copy } from 'interfaces/FeatureDto.interface'
import { useState, Dispatch, SetStateAction } from 'react'
import styled from 'styled-components'
import Loading from './Loading'
import NotSupported from './NotSupported'
import 'balloon-css'

interface Props {
  copies: Copy[] | undefined
  text: string
  feature: string
  isFetching: boolean
  error: unknown
  setView: Dispatch<SetStateAction<number>>
  setVoice: Dispatch<SetStateAction<string>>
}

interface ListProps {
  fromText: string
  texts: string[]
  textMaxLimit: number
  setView: Dispatch<SetStateAction<number>>
}

const ScreenTwo = ({
  copies,
  text,
  feature,
  isFetching,
  error,
  setView,
  setVoice,
}: Props) => {
  const { data: toneVoices } = useGetVoices()

  function showFeatureType() {
    switch (feature) {
      case 'rephrase':
        return (
          <>
            <img src={chrome.runtime.getURL('assets/img/rewrite.svg')} />
            <Text>Rewrite</Text>
          </>
        )
      case 'expand':
        return (
          <>
            <img src={chrome.runtime.getURL('assets/img/expand.svg')} />
            <Text>Expand</Text>
          </>
        )
      case 'shorten':
        return (
          <>
            <img src={chrome.runtime.getURL('assets/img/shorten.svg')} />
            <Text>Shorten</Text>
          </>
        )
      default:
        break
    }
  }

  return (
    <Container>
      <TopBar>
        <LeftPart>
          <Back
            id="writesonic-back"
            onClick={() => setView(1)}
            src={chrome.runtime.getURL('assets/img/arrow-left.svg')}
          />
          {showFeatureType()}
        </LeftPart>
        {/* <div>
          <StyledSelect
            name="status"
            onChange={(e) => {
              setVoice(e.target.value)
            }}
          >
            {toneVoices?.map((toneVoice, index) => (
              <option key={index} value={toneVoice.value}>
                {toneVoice.label}
              </option>
            ))}
          </StyledSelect>
        </div> */}
      </TopBar>
      {isFetching && <Loading />}
      {error && (
        <NotSupported
          label={"Sorry, the text you’ve selected is not supported"}
        />
      )}
      {copies && (
        <List
          fromText={text}
          setView={setView}
          texts={copies.map((copy) => copy.text)}
          textMaxLimit={feature === 'expand' ? 300 : 1000}
        />
      )}
      {copies === undefined && isFetching === false && error === null && (
        <NotSupported
          label={
            'Your selected text needs to be at least 6 words long. Please select a longer piece of text and try again.'
          }
        />
      )}
    </Container>
  )
}

const List = ({ fromText, texts, setView, textMaxLimit }: ListProps) => {
  const { data: leftCreditsJson } = useGetLeftCredits()
  const leftCredits =
    (leftCreditsJson?.one_time_credits ?? 0) +
    (leftCreditsJson?.recurring_credits ?? 0) +
    (leftCreditsJson?.lifetime_deal_credits ?? 0) +
    (leftCreditsJson?.reward_credits ?? 0)

  const [hoverStatus, setHoverStatus] = useState<boolean>(false)
  const [textCopy, setTextCopy] = useState<boolean>(false)

  return (
    <>
      {texts?.length > 0 && texts?.length < textMaxLimit && (
        <>
          <Separator />
          <TextsList>
            {texts?.map((text, index) => (
              <ListElement
                key={index}
                onClick={() => {
                  if (hoverStatus === false) {
                    chrome.runtime.sendMessage({
                      updateText: text,
                      from: fromText,
                    })
                      ; (
                        document.getElementById('writesonic__root') as HTMLElement
                      ).style.display = 'none'
                    setView(1)
                  }
                }}
              >
                <ListElementText>
                  {text}
                  <ClipBoardButton
                    id="copyText"
                    aria-label={textCopy ? 'Copied!' : 'Copy Text'}
                    data-balloon-pos="left"
                    onMouseOver={() => setHoverStatus(true)}
                    onMouseOut={() => setHoverStatus(false)}
                    onClick={() => {
                      setTextCopy(true)
                      navigator.clipboard.writeText(text)
                    }}
                  >
                    <ClipboardIcon />
                  </ClipBoardButton>
                </ListElementText>
              </ListElement>
            ))}
          </TextsList>
          <Separator />
          <Footer />
        </>
      )}
      {texts.length === 0 && leftCredits === 0 && (
        <NotSupported
          label={"You don't have enough credits. Purchase more by clicking "}
          showBuyLink={true}
        />
      )}
    </>
  )
}

const Container = styled.div`
  width: 98%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.04), 0px 11px 22px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background-color: #fff;
  margin-top: -2px;
  margin-left: 5px;
`

const TopBar = styled.div`
  padding: 0 14px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 14px 2px;
`
const LeftPart = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledSelect = styled.select`
  background: #fff;
  color: #111827;
  width: 164px;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05);
  border: 1px solid #e8eaf5;
  border-radius: 6px;
  padding: 9px 13px;
`

const Back = styled.img`
  margin-left: 2px;
  margin-right: 16px;
  cursor: pointer;
`

const Text = styled.span`
  margin-left: 8px;
  color: #6b7280;
`

const TextsList = styled.ul`
  width: 100%;
  padding: 0 14px;
  list-style-type: none;
  max-height: 200px;
  overflow-y: auto;
`

const ListElement = styled.li`
  width: 100%;
  font-weight: normal;
  font-size: 16px;
  line-height: 18px;
  color: #111827;
  border-bottom: 1px solid rgba(107, 114, 128, 0.08);
  cursor: pointer;
  display: flex;
  align-items: center;
  &:last-child {
    border-bottom: unset;
  }
`

const ClipBoardButton = styled.button`
  display: none;
  width: 20px;
  height: 20px;
  justify-content: end;
  border: none;
  background-color: transparent;
  position: relative;
  &:hover {
    color: #4f46e5;
  }
`

const ListElementText = styled.span`
  width: 100%;
  margin: 5px 0;
  font-weight: normal;
  font-size: 16px;
  color: #111827;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 5px 16px 5px 5px;
  &:hover {
    background: #e8f5e9;
    border-radius: 6px;
  }
  &:hover ${ClipBoardButton} {
    display: flex;
  }
`

export default ScreenTwo
