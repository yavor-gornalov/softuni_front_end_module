window.addEventListener("load", solve);

function solve() {
    const inputSelectors = document.querySelectorAll("form>:not([type='button'])")
    const checkListContainer = document.querySelector("ul#check-list")
    const contactListContainer = document.querySelector("ul#contact-list")

    const addContactBtn = document.querySelector("input#add-btn")
    addContactBtn.addEventListener("click", addContact)

    function addContact(e) {
        e.preventDefault()

        let tokens = getInputValues(inputSelectors)

        if (tokens.some(val => val ==="")) return;

        clearInputFields(inputSelectors)
        
        const contactElement = createContactElement(tokens)
        checkListContainer.appendChild(contactElement)
    }

    function editContact(e, tokens) {
        e.preventDefault()
        for(let i = 0; i<tokens.length; i++) {
            inputSelectors[i].value = tokens[i]
        }
        e.target.parentElement.parentElement.remove()
    }

    function saveContact (e) {
        e.preventDefault()
        const phoneElement = e.target.parentElement.parentElement
        phoneElement.querySelector(".buttons").remove()

        const deleteBtn = createElement("button", phoneElement, null,["del-btn"])
        deleteBtn.addEventListener("click", deleteContact)

        contactListContainer.appendChild(phoneElement)

    }

    function deleteContact (e) {
        e.preventDefault()
        e.target.parentElement.remove()
    }

    function createContactElement(tokens) {
        let [name, phoneNumber, category] = tokens

        let contactElement = createElement("li")
        let articleElement = createElement("article", contactElement)
        let nameElement = createElement("p", articleElement, `name:${name}`)
        let phoneNumberElement = createElement("p", articleElement, `phone:${phoneNumber}`)
        let categoryElement = createElement("p", articleElement, `category:${category}`)
        let buttonsContainer = createElement("div", contactElement, null, ["buttons"])
        let editBtn = createElement("button", buttonsContainer, null, ["edit-btn"])
        let saveBtn = createElement("button", buttonsContainer, null, ["save-btn"])

        editBtn.addEventListener("click", (e) => editContact(e, tokens))
        saveBtn.addEventListener("click", saveContact)

        return contactElement
    }



    // HELPERS
    function createElement(tagName, parentElement, textContent, classList, elementId) {
        const element = document.createElement(tagName);
        if (textContent) {
            element[tagName === "input" ? "value" : "textContent"] = textContent;
        }
        if (Array.isArray(classList)) {
            element.classList.add(...classList);
        }
        if (elementId) {
            element.setAttribute("id", elementId);
        }
        if (parentElement) {
            parentElement.appendChild(element);
        }
        return element;
    }

    function getInputValues(inputSelectors) {
        return Array.from(inputSelectors).map((x) => x.value);
    }

    function clearInputFields(inputSelectors) {
        Array.from(inputSelectors).forEach((x) => (x.value = ""));
    }
}
