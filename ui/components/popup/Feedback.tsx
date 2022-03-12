import AwesomeEmoji from 'components/shared/AwesomeEmoji'
import BadEmoji from 'components/shared/BadEmoji'
import OkEmoji from 'components/shared/OkEmoji'
import { useState } from 'react'
import styled from 'styled-components'

const Feedback = () => {
  const [selectedExperience, setSelectedExperience] =
    useState<string>('Awesome')

  return (
    <Container>
      <Title>How was your experience?</Title>
      <ExperienceType
        checked={selectedExperience === 'Bad'}
        onClick={() => setSelectedExperience('Bad')}
      >
        <RadioButton
          type="radio"
          name="selectedExperience"
          checked={selectedExperience === 'Bad'}
          value="Bad"
          onChange={(e) => setSelectedExperience(e.target.value)}
        />
        <RadioButtonLabel>
          <BadEmoji /> Bad
        </RadioButtonLabel>
      </ExperienceType>
      <ExperienceType
        checked={selectedExperience === 'Just OK'}
        onClick={() => setSelectedExperience('Just OK')}
      >
        <RadioButton
          type="radio"
          name="selectedExperience"
          checked={selectedExperience === 'Just OK'}
          value="Just OK"
          onChange={(e) => setSelectedExperience(e.target.value)}
        />
        <RadioButtonLabel>
          <OkEmoji />
          Just OK
        </RadioButtonLabel>
      </ExperienceType>
      <ExperienceType
        checked={selectedExperience === 'Awesome'}
        onClick={() => setSelectedExperience('Awesome')}
      >
        <RadioButton
          type="radio"
          name="selectedExperience"
          checked={selectedExperience === 'Awesome'}
          value="Awesome"
          onChange={(e) => setSelectedExperience(e.target.value)}
        />
        <RadioButtonLabel>
          <AwesomeEmoji />
          Awesome
        </RadioButtonLabel>
      </ExperienceType>

      <InputContainer>
        <InputHelper>Share your thoughts</InputHelper>
        <Input />
      </InputContainer>
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
  margin-bottom: 24px;
`

export const ExperienceType = styled.div<ExperienceTypeChecked>`
  border-radius: 120px;
  font-size: 13px;
  line-height: 25px;
  display: flex;
  align-items: center;
  height: 40px;
  margin-bottom: 12px;
  cursor: pointer;

  font-weight: ${(props) => (props.checked ? 'bold' : 'normal')};
  color: ${(props) => (props.checked ? '#fff' : '#6b7280;')};
  background: ${(props) =>
    props.checked ? '#8dc546' : 'rgba(107, 114, 128, 0.08)'};
`

interface ExperienceTypeChecked {
  checked?: boolean
}

export const RadioButton = styled.input`
  background: rgba(255, 255, 255, 0.2);
  width: 10px;
  height: 10px;
  margin: 0 5px;
  border-radius: 50%;
  vertical-align: sub;
  visibility: hidden;
  cursor: pointer;
`
export const RadioButtonLabel = styled.label`
  font-size: 13px;
  line-height: 25px;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
`

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 16px;
  margin-bottom: 24px;
`

const InputHelper = styled.span`
  color: #374151;
  font-size: 14px;
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
`

export default Feedback
