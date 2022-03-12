import styled from 'styled-components'
import { Dispatch, SetStateAction } from 'react'

interface Props {
  setShow: Dispatch<SetStateAction<boolean>>
}

const WritsonicButton = styled.div`
  width: 30px;
  height: 30px;
  cursor: pointer;
  background-image: url(${chrome.runtime.getURL('favicon.png')});
  background-size: contain;
  border: none;
  margin-left : 2px;
  background-color: rgba(0, 0, 0, 0);
`

// const ShowButton = WritsonicButton
const ShowButton = ({ setShow }: Props) => {
  return (
    <WritsonicButton
      onClick={() => {
        setShow((show) => !show)
      }}
    ></WritsonicButton>
  )
}

export default ShowButton
