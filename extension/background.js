async function updateToken() {
  const siteToken = await chrome.cookies.get({
    name: 'Token',
    url: 'https://app.writesonic.com',
    // url: 'http://localhost:3000',
  })

  if (!siteToken?.value) {
    chrome.storage.local.set({ accessToken: '', isLogged: false })
    return
  }

  chrome.storage.local.set({ accessToken: siteToken?.value, isLogged: true })
}

function forwardTextEvent(msg, sender) {
  if (msg.hasOwnProperty('changeText')) {
    chrome.tabs.sendMessage(sender.tab.id, {
      changeText: msg.changeText,
      frameWidth: msg.frameWidth,
    })
  } else if (msg.hasOwnProperty('updateText')) {
    chrome.tabs.sendMessage(sender.tab.id, {
      updateText: msg.updateText,
      from: msg.from,
    })
  }
}

function setDefaultSites() {
  chrome.storage.local.set({
    activeSites: [
      'medium.com',
      'twitter.com',
      'mail.google.com',
      'docs.google.com',
      'www.linkedin.com',
      'www.facebook.com',
    ],
  })
}

chrome.runtime.onInstalled.addListener(setDefaultSites)
chrome.runtime.onInstalled.addListener(
  function (details) {
    if (details.reason === "install") {
      chrome.tabs.create({ url: 'https://app.writesonic.com/signup?utm_source=chrome-extension' })
    }
  })
chrome.runtime.onInstalled.addListener(details => {
  if (details.reason === chrome.runtime.OnInstalledReason.INSTALL) {
    chrome.runtime.setUninstallURL('https://forms.reform.app/writesonic/chrome-uninstall/tpfwc3');
  }
})
chrome.runtime.onStartup.addListener(updateToken)
chrome.runtime.onMessage.addListener(forwardTextEvent)

chrome.tabs.onUpdated.addListener(updateToken)
chrome.tabs.onActivated.addListener(updateToken)
