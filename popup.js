document.getElementById('injectButton').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        files: ['content.js']
      });
    });
  });
  
//what is the purpose of this code?
//This code is used to inject the content.js file into the current tab when 
// the button is clicked. 
// This is done by querying the active tab and then executing the content.js file in that tab. This allows the content.js file to run in the context of the current tab, enabling it to interact with the DOM and perform actions on the page.  