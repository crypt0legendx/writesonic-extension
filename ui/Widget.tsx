import { useEffect, useState } from 'react'
import ScreenOne from 'components/iframe/ScreenOne'
import ScreenTwo from 'components/iframe/ScreenTwo'
import Error from 'components/iframe/Error'
import useFeature from 'hooks/useFeature'

interface Props {
  show: boolean
  text: string
  updatedFrameWidth: number
}

const Widget = ({ show, text, updatedFrameWidth }: Props) => {
  const iframe = document.getElementById('writesonic-iframe') as HTMLElement

  if (!show) {
    iframe.style.width = '30px'
    iframe.style.height = '30px'
    return null
  }

  const [view, setView] = useState<number>(1)
  const [feature, setFeature] = useState<string>('')
  const [voice, setVoice] = useState<string>('excited')

  const { data, isFetching, error } = useFeature(text, feature, voice)

  useEffect(() => {
    console.log('updatedFrameWidth', updatedFrameWidth)
    switch (view) {
      case 1:
        iframe.style.width = '400px'
        iframe.style.height = '170px'
        break
      case 2:
        iframe.style.width = updatedFrameWidth + 'px'
        iframe.style.height = '370px'
    }
  }, [view])

  if (view == 2) {
    iframe.style.width = updatedFrameWidth + 'px'
  }

  // console.log(data, text, feature, voice, error)



  switch (view) {
    case 1:
      return <ScreenOne setView={setView} setFeature={setFeature} />
    case 2:
      return (
        <ScreenTwo
          text={text}
          setView={setView}
          setVoice={setVoice}
          copies={data}
          feature={feature}
          isFetching={isFetching}
          error={error}
        />
      )
    default:
      return <Error />
  }
}

export default Widget
