// Function to log the first item in the table
function logFirstTableItem() {
    // Get the first table element on the page
    const table = document.querySelector('table');
    if (table) {
      // Get the first row of the table
      const firstRow = table.rows[0];
      if (firstRow) {
        // Get the first cell of the first row
        const firstCell = firstRow.cells[0];
        if (firstCell) {
          // Log the text content of the first cell
          console.log('First item in the table:', firstCell.textContent);
          return firstCell.textContent;
        } else {
          console.log('No cells found in the first row.');
        }
      } else {
        console.log('No rows found in the table.');
      }
    } else {
      console.log('No table found on the page.');
    }
    return null;
  }
  
  // Function to inject a fixed HTML element
  function injectFixedElement(content) {
    const fixedElement = document.createElement('div');
    fixedElement.style.position = 'fixed';
    fixedElement.style.bottom = '10px';
    fixedElement.style.right = '10px';
    fixedElement.style.padding = '10px';
    fixedElement.style.backgroundColor = 'lightblue';
    fixedElement.style.border = '1px solid #000';
    fixedElement.id = 'fixedElement';
    fixedElement.textContent = `First Table Item: ${content}`;
    document.body.appendChild(fixedElement);
  }
  
  // Function to update the fixed HTML element
  function updateFixedElement(content) {
    const fixedElement = document.getElementById('fixedElement');
    if (fixedElement) {
      fixedElement.textContent = `First Table Item: ${content}`;
    }
  }
  
  // Main function
  function main() {
    const firstItem = logFirstTableItem();
    if (firstItem) {
      injectFixedElement(firstItem);
  
      // Get the first table element on the page
      const table = document.querySelector('table');
      if (table) {
        // Get the first row of the table
        const firstRow = table.rows[0];
        if (firstRow) {
          // Get the first cell of the first row
          const firstCell = firstRow.cells[0];
          if (firstCell) {
            // Create a MutationObserver to watch for changes in the first cell
            const observer = new MutationObserver((mutationsList) => {
              for (const mutation of mutationsList) {
                if (mutation.type === 'characterData') {
                  const newItem = firstCell.textContent;
                  console.log('First item in the table changed to:', newItem);
                  updateFixedElement(newItem);
                }
              }
            });
  
            // Configure the observer to watch for changes to the text content of the first cell
            observer.observe(firstCell, { characterData: true, subtree: true });
          }
        }
      }
    }
  }
  
  // Run the main function
  main();
  