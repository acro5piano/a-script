function notify(text) {
  const style = document.createElement('style')

  const styled = {
    div: (...literals) => literals[0],
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

  getHead().appendChild(style)

  const div = document.createElement('div')
  div.innerText = text
  div.classList.add('notification')

  getBody().appendChild(div)

  setTimeout(() => div.remove(), 2000)
}

function getBody() {
  return document.documentElement || document.body || document.querySelector('body')
}

function getHead() {
  return document.documentElement || document.head || document.querySelector('head')
}

function copy(value) {
  const textarea = document.createElement('textarea')

  textarea.innerHTML = value
  textarea.setAttribute('id', 'content')
  getBody().appendChild(textarea)

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

function formatRow(title, location) {
  return `${title}\t\t\t${location}`
}

function main() {
  const content = getContent()
  copy(content)
  notify('Content Copied!')
}

function getOnObject() {
  const on = document.getElementById('on')
  if (on) {
    return on
  }
  const el = document.createElement('input')
  el.setAttribute('id', 'on')
  el.value = 'true'
  getBody().appendChild(el)
  return el
}

function isOn() {
  return getOnObject().value === 'true'
}

function toggle() {
  getOnObject().value = getOnObject().value === 'true' ? 'false' : 'true'
}

setInterval(main, 3000)
