function deleteByEmail() {
    const inputText = getInputText("email");

    let outputElement = document.getElementById("result");
    let result = removeEmail(inputText);

    outputElement.textContent = result;

    function getInputText(elementName) {
        let inputField = document.getElementsByName(elementName)[0];
        const text = inputField.value;
        inputField.value = "";
        return text;
    }

    function removeEmail(email) {
        let tableRows = Array.from(document.querySelectorAll("tbody tr"));

        for (const row of tableRows) {
            const currentMail = row.children[1].textContent;
            if (currentMail === email) {
                row.remove();
                return "Deleted.";
            }
        }
        return "Not found.";
    }
}
