// @flow

import { initStore, getState, dispatch, actionTypes } from './store'
import * as dom from './dom'
import { injectStyle } from './injectStyle'
import type { AppState } from './interface'

function notify(text) {
  const div = document.createElement('div')
  div.innerText = text
  div.classList.add('notification')

  dom.getBody().appendChild(div)

  setTimeout(() => div.remove(), 2000)
}

function copy(value) {
  const textarea = document.createElement('textarea')

  textarea.innerHTML = value
  textarea.setAttribute('id', 'content')
  dom.getBody().appendChild(textarea)

  textarea.select()
  document.execCommand('copy')
  textarea.remove()
}

function getContent() {
  const titles = Array.from(document.getElementsByClassName('section-result-title')).map(
    e => e.getElementsByTagName('span')[0].innerText,
  )
  const locations = Array.from(document.getElementsByClassName('section-result-location')).map(
    e => e.innerText,
  )

  return Array(titles.length)
    .fill(0)
    .map((_, i) => formatRow(titles[i], locations[i]))
    .join('\n')
}

function formatRow(title: ?string, location: ?string) {
  if (!title || !location) {
    throw new Error('invalid values')
  }
  return `${title}\t\t\t${location}`
}

/* @export */
function toggle(): boolean {
  const { enabled } = getState()
  if (enabled) {
    dispatch(actionTypes.SET_ENABLED)
    notify('Text Copy is Disabled...')
  } else {
    dispatch(actionTypes.SET_DISABLED)
    notify('Text Copy is Enabled!')
  }
  return getState().enabled
}

window.toggle = toggle

function main() {
  const text = getContent()
  if (getState().copiedText !== text) {
    dispatch(actionTypes.SET_COPIED_TEXT, { copiedText: text })
    copy(text)
    notify('Text Copied!')
  }
}

initStore()
injectStyle()
setInterval(main, 2000)
