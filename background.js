// Function to send a message to the content script to update the table content
function updateTableContent() {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {action: 'updateTableContent'}, (response) => {
      if (response && response.status === 'success') {
        console.log('Table content updated successfully');
      } else {
        console.log('Failed to update table content');
      }
    });
  });
}

// Listen for messages from the popup or other parts of the extension
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'triggerUpdate') {
    updateTableContent();
    sendResponse({status: 'update triggered'});
  }
});
