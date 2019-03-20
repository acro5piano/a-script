// @flow

import * as dom from './dom'
import type { AppState } from './interface'

export function initStore() {
  let el = document.getElementById('store')
  if (el) {
    return
  }
  el = document.createElement('input')
  el.setAttribute('id', 'store')
  el.setAttribute('value', '{}')
  el.value = '{}'
  dom.getBody().appendChild(el)
}

export function getState(): AppState {
  const maybeString = dom.getElementByIdOrFail('store').getAttribute('value')
  if (maybeString === null || maybeString === undefined) {
    console.log(maybeString)
    throw new Error('value is null')
  }
  return JSON.parse(maybeString)
}

export function dispatch(action: $Keys<typeof actionTypes>, payload: any) {
  const state = getState()
  switch (action) {
    case actionTypes.SET_ENABLED:
      state.enabled = true
      break
    case actionTypes.SET_DISABLED:
      state.enabled = false
      break
    case actionTypes.SET_COPIED_TEXT:
      state.copiedText = payload.copiedText
      break
  }
  const el = dom.getElementByIdOrFail('store')
  el.setAttribute('value', JSON.stringify(state))
}

export const actionTypes = {
  SET_ENABLED: 'SET_ENABLED',
  SET_DISABLED: 'SET_DISABLED',
  SET_COPIED_TEXT: 'SET_COPIED_TEXT',
}
