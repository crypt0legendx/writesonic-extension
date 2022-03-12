// returns the iframe positioned at caret location
export function caretIframe() {
  return document.querySelector('iframe.docs-texteventtarget-iframe')
}

// returns the element that listens for various text events in google docs
function textEventNode() {
  return caretIframe().contentDocument.querySelector('body > div:nth-child(1)')
}

export function caretPosition() {
  const caret = document.querySelector('.kix-cursor.docs-ui-unprintable')
  if (caret.style.display !== 'none') return caret.getBoundingClientRect()
  caret.style.display = 'block'
  const { top, left } = caret.getBoundingClientRect()
  caret.style.display = 'none'
  return { top, left }
}

// replace selected text in document to `value`
export function replaceSelection(value) {
  const clipboardData = new DataTransfer()
  clipboardData.setData('text/plain', value)
  textEventNode().dispatchEvent(new ClipboardEvent('paste', { clipboardData }))
}

export function getSelection() {
  textEventNode().dispatchEvent(new ClipboardEvent('copy'))
  return caretIframe().contentWindow.getSelection()
}
