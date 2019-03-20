chrome.tabs.executeScript(null, { file: 'bundle.js' }, () => {
  if (chrome.runtime.lastError) {
    console.error(chrome.runtime.lastError.message)
  }
  chrome.tabs.executeScript(null, { code: 'window.toggle()' }, (...res) => {
    if (chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError.message)
    }
  })
})
