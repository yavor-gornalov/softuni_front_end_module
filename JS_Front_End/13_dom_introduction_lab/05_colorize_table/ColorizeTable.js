function colorize() {
    tableItems = Array.from(document.querySelectorAll("tr:nth-child(even)"));
    tableItems.forEach((element) => {
        element.style.background = "Teal";
    });
}
