let intervalId; // Variable to hold the interval ID
let gameId = 0
// Function to start fetching and updating every second
function startFetchingAndUpdate() {
  intervalId = setInterval(() => {
    const firstItem = logFirstTableItem();
    if (firstItem) {
        fetchAndUpdateFixedElement(firstItem);
    }
  }, 1000); // Fetch every 1000 milliseconds (1 second)
}

// Function to stop the interval
function stopFetchingAndUpdate() {
  clearInterval(intervalId);
}

// Function to log the first item in the table
function logFirstTableItem() {
  const table = document.querySelector('div.h1cw04l8 table.ui-table.is-hover');
  if (table) {
    const firstRow = table.rows[1];
    if (firstRow) {
      const firstCell = firstRow.cells[0];
      if (firstCell) {
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

// Function to fetch data from server and update the fixed HTML element
function fetchAndUpdateFixedElement(content) {
    if(gameId == content){
        return;
    }
    fetch('http://192.168.14.41:8080/api/data') 
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        data = JSON.parse(data);
        let crash = data.crash
        console.log(crash)
        let dotPostion = crash.indexOf(".")
        crash = crash.slice(0, dotPostion + 3)
        updateFixedElement(content, crash); // Update fixed element with fetched data
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        // Optionally handle error or retry mechanism here
      });
  }

// Function to update the fixed HTML element with fetched data
function updateFixedElement(content, crash) {
    const fixedElement = document.getElementById('fixedElement');
    if (fixedElement) {
      fixedElement.innerHTML = `
        <p>The latest GameId: ${content}</p>
        <p>The next crash value: ${crash}</p>
      `;
    } else {
      const newFixedElement = document.createElement('div');
      newFixedElement.style.position = 'fixed';
      newFixedElement.style.top = '300px';
      newFixedElement.style.right = '300px';
      newFixedElement.style.padding = '10px';
      newFixedElement.style.backgroundColor = 'lightblue';
      newFixedElement.style.border = '1px solid #000';
      newFixedElement.id = 'fixedElement';
      newFixedElement.innerHTML = `
        <p>The latest GameId: ${content}</p>
        <p>The next crash value: ${crash}</p>
      `;
      document.body.appendChild(newFixedElement);
    }
  }

// Initialize the extension
function initializeExtension() {
  startFetchingAndUpdate();
}

// Stop fetching and updating when the tab is inactive or closed
window.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') {
    stopFetchingAndUpdate();
  } else {
    startFetchingAndUpdate();
  }
});

// Start the extension
initializeExtension();
