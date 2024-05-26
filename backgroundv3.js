// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//     if (request.message === "fetchUrl") {
//       fetch(request.url)
//         .then(response => response.text())
//         .then(text => sendResponse({data: text, success: true}))
//         .catch(error => sendResponse({data: error, success: false}));
//       return true;  // Will respond asynchronously.
//     }
//   });
chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['content.js']
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
