// @flow

import * as dom from './dom'
import type { AppState } from './interface'

function init() {
  let el = document.getElementById('store')
  if (el) {
    return
  }
  el = document.createElement('input')
  el.setAttribute('id', 'store')
  el.value = ''
  dom.getBody().appendChild(el)
}

export function getState(): AppState {
  const maybeString = dom.getElementByIdOrFail('store').getAttribute('value')
  if (!maybeString) {
    throw new Error('value is null')
  }
  return JSON.parse(maybeString)
}

export function dispatch(action: $Keys<typeof actionTypes>, payload: any) {
  const state = this.getState()
  switch (action) {
    case actionTypes.SET_ENABLED:
      state.enabled = true
      return
  }
  const el = dom.getElementByIdOrFail('store')
  el.setAttribute('value', JSON.stringify(state))
}

export const actionTypes = {
  SET_ENABLED: 'SET_ENABLED',
  SET_DISABLED: 'SET_DISABLED',
}

init()
