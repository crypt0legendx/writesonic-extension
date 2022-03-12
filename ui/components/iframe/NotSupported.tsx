import styled from 'styled-components'
import Separator from 'components/shared/Separator'

interface Props {
  label: string
  showBuyLink?: boolean
}

const NotSupported = ({ label, showBuyLink }: Props) => {
  return (
    <>
      <Separator />
      <Container>
        <ErrorIcon src={chrome.runtime.getURL('assets/img/misuse.svg')} />
        <span>
          {label}
          {showBuyLink && (
            <Link
              href={String(import.meta.env.VITE_FRONT_END_BASE_URL)}
              target="_blank"
              rel="noreferrer"
            >
              here
            </Link>
          )}
        </span>
      </Container>
    </>
  )
}

const Container = styled.div`
  height: 46px;
  width: 100%;
  background: rgba(255, 110, 64, 0.1);
  border-radius: 6px;
  margin: 14px;
  font-size: 12px;
  line-height: 18px;
  color: #ff6e40;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

const ErrorIcon = styled.img`
  margin: 0 8px;
  margin-left: 15px;
`

const Link = styled.a`
  color: #ff6e40;
`

export default NotSupported
