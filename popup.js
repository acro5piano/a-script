chrome.tabs.executeScript(null, { file: 'main.js' }, () => {
  if (chrome.runtime.lastError) {
    console.log(chrome.runtime.lastError.message)
  }
})
