function solve() {
    let selectToElement = document.getElementById("selectMenuTo");
    const optionToBinary = document.createElement("option");
    optionToBinary.value = "binary";
    optionToBinary.textContent = "Binary";
    selectToElement.appendChild(optionToBinary);

    const optionToHexadecimal = document.createElement("option");
    optionToHexadecimal.value = "hexadecimal";
    optionToHexadecimal.textContent = "Hexadecimal";
    selectToElement.appendChild(optionToHexadecimal);

    const button = document.getElementsByTagName("button")[0];
    button.addEventListener("click", convert);
    function convert(e) {
        let decimal = parseInt(document.getElementById("input").value);
        let selectedOptionTo = document.getElementById("selectMenuTo").value;
        let outputElement = document.getElementById("result");

        if (selectedOptionTo === "binary") {
            outputElement.value = decimal.toString(2);
        } else if (selectedOptionTo === "hexadecimal") {
            outputElement.value = decimal.toString(16).toLocaleUpperCase();
        }
    }
}
