async function refreshWidget(selection) {
  const { caretPosition } = await import('./utils.js')
  const { moveWidget } = await import('../utils.js')
  const { top, left } = caretPosition()

  moveWidget(top - 30, left)

  chrome?.runtime?.sendMessage({
    changeText: selection,
  })
}

async function initWritesonic() {
  const { replaceSelection, getSelection, caretIframe } = await import(
    './utils.js'
  )

  /** Handle text selection changes **/
  let selectionId = ''
  function checkSelection() {
    const newSelection = getSelection()
    if (newSelection.extentNode.id === selectionId) return
    selectionId = newSelection.extentNode.id
    const event = new Event('ws-selection-changed')
    event.value = newSelection.toString()
    dispatchEvent(event)
    // TODO: the above can be simplified at a loss of readability;
    //       check if `ws-selection-changed` can be consumed elseware like App.tsx
    //       by eliminating use of service worker for changeText message passing
    // refreshWidget(newSelection.toString())
  }

  addEventListener('ws-selection-changed', (e) => {
    refreshWidget(e.value)
  })

  document.addEventListener('click', checkSelection)
  caretIframe().contentDocument.addEventListener('keyup', checkSelection)

  document.querySelectorAll('*')
    .forEach((element) =>
      element.addEventListener('scroll', ({ target }) => {
        if (target.scrollTop !== 0) {
          document.getElementById('writesonic__root').style.display = 'none'
        }
      })
    )

  /** Handle text replacement **/
  chrome?.runtime?.onMessage.addListener((message) => {
    if (message.updateText) replaceSelection(message.updateText)
  })
}

// TODO: remainder of the code will be shared between all platform scripts
//       move it into a seperate module. Refer to issue #26 on github.
async function startApp() {
  const app = document.createElement('div')
  app.id = 'writesonic__root'
  document.body.append(app)
  app.style.display = 'none'
  await import(chrome?.runtime?.getURL('/ui/index.js'))
  await initWritesonic()
}

function removeAppFromPage() {
  document.getElementById('writesonic__root')?.remove()
}

chrome.storage.local.get(
  ['isLogged', 'activeSites'],
  ({ isLogged, activeSites }) => {
    if (isLogged && activeSites?.includes(location.hostname)) {
      startApp()
    }
  }
)

chrome.storage.onChanged.addListener(function (changes) {
  for (let [key, { newValue }] of Object.entries(changes)) {
    if (key === 'isLogged' && newValue === false) {
      removeAppFromPage()
    }

    if (key === 'isLogged' && newValue === true) {
      startApp()
    }

    if (key === 'activeSites' && newValue.includes(location.hostname)) {
      startApp()
    }

    if (key === 'activeSites' && !newValue.includes(location.hostname)) {
      location.reload()
    }
  }
})
