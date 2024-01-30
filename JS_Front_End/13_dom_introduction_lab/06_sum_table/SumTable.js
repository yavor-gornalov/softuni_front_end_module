function sumTable() {
    tableItems = Array.from(document.querySelectorAll("td:nth-child(even)"));

    let total = 0;
    tableItems.forEach((element) => {
        total += Number(element.textContent);
    });

    document.getElementById("sum").textContent = total.toFixed(2);
}
