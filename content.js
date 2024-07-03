// content.js
(function() {
    // Create a new HTML element
    const newElement = document.createElement('div');
    newElement.textContent = 'Hello, World!';
    newElement.style.position = 'fixed';
    newElement.style.top = '300px';
    newElement.style.right = '300px';
    newElement.style.padding = '10px';
    newElement.style.backgroundColor = 'rgb(209,211,212)';
    newElement.style.zIndex = '1000';
    newElement.id = 'crashValue'
    // Append the new element to the body
    document.body.appendChild(newElement);
  })();


// Function to handle mutations
function handleMutations(mutationsList, observer) {
    for (let mutation of mutationsList) {
        if (mutation.type === 'childList' || mutation.type === 'subtree' || mutation.type === 'characterData') {
            console.log('Element content changed:', mutation);
            
            // Example: Send a message to the background script
            chrome.runtime.sendMessage(
                {
                    action: 'elementContentChanged',
                    content: mutation.target.textContent,
                },
                function (response) {
                    console.log('Message sent to background script');
                }
            );
        }
    }
}

// Create a mutation observer instance
const observer = new MutationObserver(handleMutations);

// Select the target node
const targetNode = document.querySelector(".w7x5n1 button.ui-button.button-normal.s-conic.bu60zgx div.button-inner");

if (targetNode) {
    // Start observing the target node for configured mutations
    observer.observe(targetNode, {
        childList: true,
        subtree: true,
        characterData: true,
    });
    console.log('Started observing the element for content changes');
} else {
    console.error('Target node not found');
}

