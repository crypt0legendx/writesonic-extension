import Separator from 'components/shared/Separator'
import ShareIcon from 'components/shared/ShareIcon'
import StarIcon from 'components/shared/StarIcon'
import { useState, useEffect, Dispatch, SetStateAction } from 'react'
import styled from 'styled-components'

interface Props {
  activeSites: string[]
  setActivePage: Dispatch<SetStateAction<number>>
}

const Info = ({ activeSites, setActivePage }: Props) => {
  const [currentSite, setCurrentSite] = useState<string>('')
  const [isEnabled, setIsEnabled] = useState<boolean>(false)

  useEffect(() => {
    if (activeSites)
      chrome?.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
        const url = new URL(tabs[0].url as string)
        setCurrentSite(url.hostname)

        if (activeSites.some((activeSite) => activeSite === url.hostname)) {
          setIsEnabled(true)
        }
      })
  }, [activeSites])

  function updateStorage(isChecked: boolean) {
    if (isChecked) {
      chrome.storage.local.set({ activeSites: [...activeSites, currentSite] })
      setIsEnabled(true)
    }

    if (!isChecked) {
      chrome.storage.local.set({
        activeSites: activeSites.filter((site) => site !== currentSite),
      })
      setIsEnabled(false)
    }
  }

  return (
    <InfoContainer>
      <Title>Quick settings</Title>

      <CheckboxContainer>
        <span>
          Enable on <strong>{currentSite}</strong>
        </span>
        <label className="form-switch">
          <input
            type="checkbox"
            checked={isEnabled}
            onChange={(e) => updateStorage(e.target.checked)}
          />
          <i></i>
        </label>
      </CheckboxContainer>

      <Separator />

      <UpgradeButton onClick={() => chrome.tabs.create({url: 'https://app.writesonic.com/settings/billing'})}>
        ❤️ <strong>Upgrade now</strong> to unlock unlimited generations!
      </UpgradeButton>

      <BlueContainer>
        {/* <BlueButton>
          <StarIcon />
          Give Feedback
        </BlueButton>
        <BlueButton onClick={() => setActivePage(3)}>
          <ShareIcon />
          Share
        </BlueButton> */}
      </BlueContainer>
    </InfoContainer>
  )
}

const InfoContainer = styled.div`
  padding: 0 32px;
  padding-top: 24px;
  display: flex;
  flex-direction: column;
`

const CheckboxContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 14px;
  color: #6b7280;
  font-size: 13px;
`

const Title = styled.h1`
  font-family: 'Inter', sans-serif;
  font-weight: 800;
  font-size: 16px;
  color: #111827;
  margin-bottom: 24px;
`

const UpgradeButton = styled.a`
  background: rgba(236, 72, 153, 0.07);
  border-radius: 6px;
  color: rgba(236, 72, 153, 0.8);
  padding: 6px 12px;
  height: 32px;
  font-weight: 500;
  font-size: 11px;
  width: 100%;
  margin-top: 20px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2px;
`

const BlueContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 5px;
  margin-top: 12px;
  margin-bottom: 16px;
`

const BlueButton = styled.button`
  background: rgba(79, 70, 229, 0.08);
  border-radius: 6px;
  font-weight: 500;
  font-size: 12px;
  color: #4f46e5;
  text-align: center;
  width: 50%;
  border: none;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  cursor: pointer;
`

export default Info
