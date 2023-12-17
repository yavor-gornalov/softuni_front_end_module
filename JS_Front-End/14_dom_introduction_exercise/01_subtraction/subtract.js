function subtract() {
    first = Number(document.getElementById("firstNumber").value);
    second = Number(document.getElementById("secondNumber").value);

    resultElement = document.getElementById("result");
    resultElement.textContent = first - second;
}
