function search() {
    let searchText = document.getElementById("searchText").value;
    const searchTextRegex = new RegExp(searchText, "g");
    const towns = Array.from(document.getElementById("towns").children);

    let matches = 0;
    towns.forEach((town) => {
        const isMatched = town.textContent.match(searchTextRegex);
        if (isMatched) {
            town.style.fontWeight = "bold";
            town.style.textDecoration = "underline";
            matches += 1;
            console.log("matched");
        } else {
            town.style.fontWeight = "";
            town.style.textDecoration = "";
        }
    });

    let result = document.getElementById("result");
    result.textContent = matches + " matches found";
}
