let on = false
chrome.browserAction.onClicked.addListener(tab => {
  console.log(on)
  on = !on
  if (on) {
    chrome.browserAction.setIcon({ path: 'icon-on.png', tabId: tab.id })
    // chrome.tabs.executeScript(tab.id, { file: 'SCRIPT.user.js' })
  } else {
    chrome.browserAction.setIcon({ path: 'icon-off.png', tabId: tab.id })
    // chrome.tabs.executeScript(tab.id, { code: 'alert()' })
  }
})
