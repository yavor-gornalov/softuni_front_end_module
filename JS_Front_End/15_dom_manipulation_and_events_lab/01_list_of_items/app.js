function addItem() {
    const inputText = getInputText();
    addItemToList(inputText);

    function getInputText() {
        let inputField = document.getElementById("newItemText");
        const text = inputField.value;
        inputField.value = "";
        return text;
    }

    function addItemToList(text) {
        const list = document.getElementById("items");
        const newListItem = document.createElement("li");
        newListItem.textContent = text;
        list.appendChild(newListItem);
    }
}
