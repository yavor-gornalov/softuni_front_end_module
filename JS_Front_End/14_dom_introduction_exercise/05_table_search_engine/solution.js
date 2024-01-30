function solve() {
    document.querySelector("#searchBtn").addEventListener("click", onClick);

    const tableRows = Array.from(document.querySelectorAll("tbody tr"));

    function onClick() {
        const searched = document.getElementById("searchField").value;
        const regex = new RegExp(searched, "g");

        tableRows.forEach((row) => {
            const cells = Array.from(row.children);
            for (const cell of cells) {
                if (cell.textContent.match(regex)) {
                    row.className = "select";
                    // console.log("row matched", cell.textContent);
                    break;
                } else {
                    row.className = "";
                }
            }
        });
    }
}
