// @flow

import './store'
import { getState, dispatch, actionTypes } from './store'
import * as dom from './dom'
import type { AppState } from './interface'

function notify(text) {
  const style = document.createElement('style')

  const styled = {
    div: (literals: string[]) => literals[0],
  }

  const css = styled.div`
    .notification {
      position: fixed;
      bottom: 64px;
      left: 40%;
      z-index: 1000;
      width: 300px;
      padding: 12px;
      background: #333;
      color: #fff;
      border-radius: 3px;
      opacity: 0.88;
    }
  `

  style.type = 'text/css'
  style.setAttribute('id', 'google-map-scraping-clipboard')
  style.appendChild(document.createTextNode(css))

  dom.getHead().appendChild(style)

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
function toggle() {
  const { enabled } = getState()
  if (enabled) {
    dispatch(actionTypes.SET_ENABLED)
  } else {
    dispatch(actionTypes.SET_DISABLED)
  }
}

window.toggle = toggle

function main() {
  const content = getContent()
  copy(content)
  notify('Content Copied!')
}

setInterval(main, 3000)
