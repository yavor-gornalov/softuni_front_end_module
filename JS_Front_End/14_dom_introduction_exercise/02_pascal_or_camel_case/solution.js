function solve() {
    let text = Array.from(document.getElementById("text").value.split(" "));
    let convention = document.getElementById("naming-convention").value;

    let result = text
        .map(function (word) {
            word = word.toLowerCase();
            word = word.charAt(0).toUpperCase() + word.slice(1);
            return word;
        })
        .join("");

    let resultElement = document.getElementById("result");
    if (convention === "Pascal Case") {
        resultElement.textContent = result;
    } else if (convention === "Camel Case") {
        resultElement.textContent = result.charAt(0).toLowerCase() + result.slice(1);
    } else {
        resultElement.textContent = "Error!";
    }
}
