function create(words) {
    let parentDiv = document.getElementById("content");
    words.forEach((word) => {
        let innerDiv = document.createElement("div");
        innerDiv.addEventListener("click", showParagraph);

        let pElement = document.createElement("p");
        pElement.textContent = word;
        pElement.style.display = "none";

        innerDiv.appendChild(pElement);
        parentDiv.appendChild(innerDiv);

        function showParagraph(e) {
            pElement.style.display = "block";
        }
    });
}
