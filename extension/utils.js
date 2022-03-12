export function showWidget(show) {
  document.getElementById('writesonic__root').style.display = show
    ? 'block'
    : 'none'
}

export function moveWidget(top, left) {
  const wsIframe = document.getElementById('writesonic-iframe')
  wsIframe.style.top = `${top}px`
  wsIframe.style.left = `${left}px` 
  document.getElementById('writesonic-iframe').style.top
}
