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
        if (!text) return;

        const list = document.getElementById("items");
        const listItem = document.createElement("li");
        listItem.textContent = text;

        const deleteButton = document.createElement("a");
        deleteButton.textContent = "[Delete]";
        deleteButton.href = "#";
        listItem.appendChild(deleteButton);

        list.appendChild(listItem);

        deleteButton.addEventListener("click", () => {
            listItem.remove();
        });
    }
}
