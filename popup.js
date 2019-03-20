chrome.tabs.executeScript(null, { file: 'main.js' }, () => {
  if (chrome.runtime.lastError) {
    console.log(chrome.runtime.lastError.message)
  }
  chrome.tabs.executeScript(null, { code: 'toggle()' }, () => {
    if (chrome.runtime.lastError) {
      console.log(chrome.runtime.lastError.message)
    }
  })
})

let toggle = false
chrome.browserAction.onClicked.addListener(function(tab) {
  toggle = !toggle
  console.log(toggle)
})
