import React from 'react'
import ReactDOM from 'react-dom'
import Frame, { FrameContextConsumer } from 'react-frame-component'
import Popup from './Popup'
import App from './App'
import GlobalStyle from 'styles/globals'
import { QueryClient, QueryClientProvider } from 'react-query'
import { StyleSheetManager } from 'styled-components'
import './styles/styles.css'
import api from 'utils/api'

const queryClient = new QueryClient()

if (document.getElementById('writesonic__root--popup')) {
  ReactDOM.render(
    <React.StrictMode>
      <GlobalStyle />
      <QueryClientProvider client={queryClient}>
        <Popup />
      </QueryClientProvider>
    </React.StrictMode>,
    document.getElementById('writesonic__root--popup')
  )
}

chrome.storage.local.get('accessToken', ({ accessToken }) => {
  if (!accessToken) {
    return
  }

  api.defaults.headers.common['access-token'] = accessToken
})

if (document.getElementById('writesonic__root')) {
  ReactDOM.render(
    <React.StrictMode>
      <Frame
        id="writesonic-iframe"
        scrolling="no"
        style={{
          width: '30px',
          height: '30px',
          position: 'fixed',
          zIndex: 99999999,
          border: 'none',
          colorScheme: 'normal',
        }}
        head={[
          <link
            key="0"
            type="text/css"
            rel="stylesheet"
            href={chrome.runtime.getURL('/ui/index.css')}
          />,
        ]}
      >
        <FrameContextConsumer>
          {(frameContext) => (
            <StyleSheetManager target={frameContext.document?.head}>
              <QueryClientProvider client={queryClient}>
                <App />
              </QueryClientProvider>
            </StyleSheetManager>
          )}
        </FrameContextConsumer>
      </Frame>
    </React.StrictMode>,

    document.getElementById('writesonic__root')
  )
}
