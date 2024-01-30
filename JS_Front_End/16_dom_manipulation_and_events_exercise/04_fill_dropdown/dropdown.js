function addItem() {
    const select = document.getElementById("menu");
    let itemText = document.getElementById("newItemText");
    let itemValue = document.getElementById("newItemValue");

    newOption = document.createElement("option");
    newOption.textContent = itemText.value;
    newOption.value = itemValue.value;

    select.appendChild(newOption);

    itemText.value = "";
    itemValue.value = "";
}
