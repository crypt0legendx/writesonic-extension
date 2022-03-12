export function addToLocalStore() {
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
    const activeSites: string[] = JSON.parse(
      localStorage.getItem('activeSites') as string
    )

    const url = new URL(tabs[0].url as string)
    activeSites.push(url.hostname)
    localStorage.setItem('activeSites', JSON.stringify(activeSites))
  })
}
