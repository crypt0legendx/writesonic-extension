import CopyIcon from 'components/shared/CopyIcon'
import EllipsisIcon from 'components/shared/EllipsisIcon'
import EmailIcon from 'components/shared/EmailIcon'
import EmptyStarIcon from 'components/shared/EmptyStarIcon'
import MessengerIcon from 'components/shared/MessengerIcon'
import WhatsappIcon from 'components/shared/WhatsappIcon'
import styled from 'styled-components'

const Share = () => {
  return (
    <Container>
      <Title>Thank you. Share your love!</Title>
      <div style={{ position: 'relative' }}>
        <Input value="https://writesonic.com" readOnly={true} />
        <div
          style={{
            position: 'absolute',
            height: '38px',
            top: '5px',
            right: '38px',
            width: '1px',
            backgroundColor: '#E8EAF5',
          }}
        ></div>
        <CopyIcon
          style={{
            position: 'absolute',
            right: '10px',
            top: '14px',
            cursor: 'pointer',
          }}
        />
      </div>

      <PlatformsContainer>
        <Platform backColor="linear-gradient(180deg, #94EA86 -15%, #5CC642 100%);">
          <WhatsappIcon />
        </Platform>

        <Platform backColor="#FF6D5E">
          <EmailIcon />
        </Platform>

        <Platform backColor="#3D9DF5">
          <MessengerIcon />
        </Platform>

        <Platform>
          <EllipsisIcon />
        </Platform>
      </PlatformsContainer>

      <BlueButton>
        <EmptyStarIcon />
        Rate us on Chrome Store
      </BlueButton>
    </Container>
  )
}

const Container = styled.div`
  padding: 0 32px;
  padding-top: 24px;
  display: flex;
  flex-direction: column;
`

const Title = styled.h1`
  font-family: 'Inter', sans-serif;
  font-weight: 800;
  font-size: 16px;
  color: #111827;
  margin-bottom: 16px;
`

const Input = styled.input`
  margin-top: 4px;
  height: 38px;
  color: #111827;
  border: 1px solid #e8eaf5;
  border-radius: 6px;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05);
  padding: 0 13px;
  outline: none;
  width: 100%;
`

const BlueButton = styled.button`
  background: rgba(79, 70, 229, 0.08);
  border-radius: 6px;
  font-weight: 500;
  font-size: 12px;
  color: #4f46e5;
  text-align: center;
  border: none;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  cursor: pointer;
  margin-bottom: 24px;
`

const PlatformsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 32px 50px;
`

interface PlatformProps {
  backColor?: string
}

const Platform = styled.div<PlatformProps>`
  border-radius: 50%;
  height: 40px;
  width: 40px;
  display: grid;
  place-items: center;
  background: ${(props) => props.backColor ?? '#BEC5D7'};
  cursor: pointer;
`

export default Share
