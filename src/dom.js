// @flow

export function getBody() {
  const el = document.documentElement || document.body || document.querySelector('body')
  if (!el) {
    throw new Error('no body found')
  }
  return el
}

export function getHead() {
  const el = document.documentElement || document.head || document.querySelector('head')
  if (!el) {
    throw new Error('no head found')
  }
  return el
}

export function getElementByIdOrFail(id: string) {
  const el = document.getElementById(id)
  if (!el) {
    throw new Error('no head found')
  }
  return el
}
