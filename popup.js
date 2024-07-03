document.addEventListener('DOMContentLoaded', () => {
  const injectButton = document.getElementById('inject');
  if (injectButton) {
    injectButton.addEventListener('click', () => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (chrome.scripting) {
          chrome.scripting.executeScript(
            {
              target: { tabId: tabs[0].id },
              files: ['content.js']
            },
            () => {
              if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError.message);
              } else {
                console.log('Script injected successfully');
              }
            }
          );
        } else {
          console.error('chrome.scripting API is not available.');
        }
      });
    });
  }
});
  