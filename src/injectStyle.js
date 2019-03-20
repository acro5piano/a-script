// @flow

import * as dom from './dom'

const styled = {
  div: (literals: string[]) => literals[0],
}

const styleId = 'google-map-scraping-clipboard'

export function injectStyle() {
  if (document.getElementById(styleId)) {
    return
  }

  const style = document.createElement('style')

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
  style.setAttribute('id', styleId)
  style.appendChild(document.createTextNode(css))

  dom.getHead().appendChild(style)
}
