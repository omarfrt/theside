chrome.browserAction.onClicked.addListener((tab) => {
    chrome.tabs.executeScript(tab.id, {
      file: 'content.js'
    });
  });
  
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "addUrlToMonitor") {
      const urlPattern = request.urlPattern;
  
      chrome.webRequest.onHeadersReceived.addListener(
        function(details) {
          const headers = details.responseHeaders.filter(header =>
            header.name.toLowerCase() !== 'x-frame-options' && header.name.toLowerCase() !== 'content-security-policy'
          );
          return { responseHeaders: headers };
        },
        { urls: [urlPattern], types: ["sub_frame"] },
        ["blocking", "responseHeaders"]
      );
  
      sendResponse({ success: true });
    }
  });
  