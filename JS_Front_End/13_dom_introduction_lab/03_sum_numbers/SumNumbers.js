function calc() {
    const first = document.getElementById("num1");
    const second = document.getElementById("num2");
    const result = Number(first.value) + Number(second.value);

    document.getElementById("sum").value = result;
}
