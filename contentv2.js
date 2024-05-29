console.log("Content script loaded");

function createSideMargin() {
  console.log("Creating side margin");
  
  // Check if the side margin already exists
  if (document.getElementById('side-margin')) {
    console.log("Side margin already exists");
    return;
  }

  // Create the container for the margin
  const container = document.createElement('div');
  container.id = 'side-margin-container';
  container.style.position = 'fixed';
  container.style.top = '0';
  container.style.right = '0';
  container.style.height = '100vh';
  container.style.display = 'none';
  container.style.zIndex = '10000';
  container.style.boxShadow = '0 0 10px rgba(0,0,0,0.5)';
  container.style.backgroundColor = 'white';
  container.style.flexDirection = 'column';
  container.style.padding = '10px';
  container.style.boxSizing = 'border-box';
  container.style.width = '30vw';
  container.style.overflow = 'auto';

  // Create the resize handle
  const resizeHandle = document.createElement('div');
  resizeHandle.style.width = '5px';
  resizeHandle.style.cursor = 'ew-resize';
  resizeHandle.style.backgroundColor = '#ccc';
  resizeHandle.style.position = 'absolute';
  resizeHandle.style.left = '-5px';
  resizeHandle.style.top = '0';
  resizeHandle.style.height = '100%';

  resizeHandle.addEventListener('mousedown', initResize);

  // Create the close button
  const closeButton = document.createElement('button');
  closeButton.innerText = 'Close';
  closeButton.onclick = toggleSideMargin;

  // Create the search input
  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.placeholder = 'Search...';
  searchInput.style.width = 'calc(100% - 20px)';
  searchInput.style.marginBottom = '10px';

  searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      const query = searchInput.value;
      searchSite(query);
    }
  });

  container.appendChild(resizeHandle);
  container.appendChild(closeButton);
  container.appendChild(searchInput);
  document.body.appendChild(container);

  console.log("Side margin created");
}

function createButton() {
  console.log("Creating button");

  // Check if the button already exists
  if (document.getElementById('side-margin-button')) {
    console.log("Button already exists");
    return;
  }

  // Create the button
  const button = document.createElement('button');
  button.id = 'side-margin-button';
  button.innerText = 'SideMargins';
  button.style.position = 'fixed';
  button.style.bottom = '10px';
  button.style.right = '10px';
  button.style.zIndex = '10000';

  button.onclick = toggleSideMargin;

  document.body.appendChild(button);
  console.log("Button created");
}

function toggleSideMargin() {
  const sideMargin = document.getElementById('side-margin-container');
  if (sideMargin.style.display === 'none' || sideMargin.style.display === '') {
    sideMargin.style.display = 'flex';
  } else {
    sideMargin.style.display = 'none';
  }
}

function initResize(e) {
  const sideMargin = document.getElementById('side-margin-container');
  window.addEventListener('mousemove', resize);
  window.addEventListener('mouseup', stopResize);

  function resize(e) {
    sideMargin.style.width = `${window.innerWidth - e.clientX}px`;
  }

  function stopResize() {
    window.removeEventListener('mousemove', resize);
    window.removeEventListener('mouseup', stopResize);
  }
}

function searchSite(query) {
    let iframe = document.createElement('iframe');
    iframe.src = query;
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    const sideMargin = document.getElementById('side-margin-container');
    sideMargin.appendChild(iframe);
  
    // Send message to background script to handle CORS for this URL
    chrome.runtime.sendMessage(
      { action: "addUrlToMonitor", urlPattern: query },
      function(response) {
        if (response && response.success) {
          console.log('CORS handling set up for:', query);
        } else {
          console.error('Failed to set up CORS handling for:', query);
        }
      }
    );
  }

createSideMargin();
createButton();
console.log("Script execution completed");
