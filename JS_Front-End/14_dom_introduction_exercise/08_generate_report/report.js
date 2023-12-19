function generateReport() {
    let columns = Array.from(document.querySelectorAll("thead tr th input"));

    let selectedColumns = {};
    let idx = 0;
    columns.forEach((col) => {
        if (col.checked) {
            selectedColumns[idx] = col.parentElement.textContent.trim().toLowerCase();
        }
        idx++;
    });

    let selectedContent = [];
    let rows = Array.from(document.querySelectorAll("tbody tr"));
    rows.forEach((row) => {
        let cells = row.children;
        let selectedRowContent = {};

        for (let i = 0; i < columns.length; i++) {
            if (selectedColumns.hasOwnProperty(i)) {
                selectedRowContent[selectedColumns[i]] = cells[i].textContent;
            }
        }
        selectedContent.push(selectedRowContent);
    });

    let outputElement = document.getElementById("output");
    outputElement.textContent = JSON.stringify(selectedContent, null, 4);
}
