import useGetLeftCredits from 'hooks/useGetLeftCredits'
import styled from 'styled-components'
import NotSupported from './NotSupported'

interface Props {
  notSupported?: boolean
}

const Footer = ({ notSupported }: Props) => {
  const { data: leftCreditsJson } = useGetLeftCredits()
  const isUnlimited = leftCreditsJson?.is_unlimited;
  const leftCredits = (leftCreditsJson?.one_time_credits ?? 0) +
    (leftCreditsJson?.recurring_credits ?? 0) + (leftCreditsJson?.lifetime_deal_credits ?? 0)
    + (leftCreditsJson?.reward_credits ?? 0);

  if (notSupported) {
    return (
      <NotSupported
        label={'Sorry, the text you’ve selected is not supported.'}
      />
    )
  }

  return (
    <StyledFooter>
      {!isUnlimited ?
        <>
          <LimitedOffer>
            ❤️ <strong>Upgrade now</strong> for <strong>∞</strong> generations!
          </LimitedOffer>
          <CreditsLeft>
            {leftCredits > 0 ? (
              <span>
                ⚡ <strong>{leftCredits}</strong> credits left
              </span>
            ) : (
              <span style={{ color: 'rgba(107, 114, 128, 0.64)' }}>
                😢 <strong>0</strong> credits left
              </span>
            )}
          </CreditsLeft>
        </>
        : <Logo src={chrome.runtime.getURL('assets/img/logo.png')} />
        }
    </StyledFooter>
  )
}

const StyledFooter = styled.footer`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 14px 0;
`

const LimitedOffer = styled.span`
  background: rgba(236, 72, 153, 0.07);
  border-radius: 6px;
  color: rgba(236, 72, 153, 0.8);
  padding: 6px 12px;
  font-weight: 500;
  font-size: 12px;
`

const CreditsLeft = styled.span`
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  color: #8dc546;
`

const Logo = styled.img`
  height: 23px;
  margin-top: -0.5px;
`

export default Footer
