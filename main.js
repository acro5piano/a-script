// TODO: only once
function copy(value) {
  const textarea = document.createElement('textarea')

  textarea.innerHTML = value
  textarea.setAttribute('id', 'content')

  const body = document.documentElement || document.body || document.querySelector('body')
  body.appendChild(textarea)

  textarea.select()

  document.execCommand('copy')
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
}

main()
