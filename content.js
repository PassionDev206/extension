// Get the first table element on the page
const table = document.querySelector('div.h1cw04l8 table.ui-table.is-hover');
if (table) {
  // Get the first row of the table
  const firstRow = table.rows[1];
  if (firstRow) {
    // Get the first cell of the first row
    const firstCell = firstRow.cells[0];
    if (firstCell) {
      // Log the text content of the first cell
      console.log('First item in the table:', firstCell.textContent);
    } else {
      console.log('No cells found in the first row.');
    }
  } else {
    console.log('No rows found in the table.');
  }
} else {
    console.log('No table found on the page.');
}
