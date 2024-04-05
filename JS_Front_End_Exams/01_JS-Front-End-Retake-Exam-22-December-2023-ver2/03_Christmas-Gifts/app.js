const baseURL = "http://localhost:3030/jsonstore/gifts/";

const presentsContainer = document.querySelector("#gift-list")
const inputSelectors = Array.from(document.querySelectorAll("#form input"))

const loadPresentsBtn = document.querySelector("#load-presents")
loadPresentsBtn.addEventListener("click", loadPresents)

const addPresentBtn = document.querySelector("#add-present")
addPresentBtn.addEventListener("click", addPresent)

const editPresentBtn = document.querySelector("#edit-present")
editPresentBtn.addEventListener("click", editPresent)


async function getPresentsData() {
    let data = {}
    try {
        const response = await fetch(baseURL, { method: "get" });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
    return data
}

async function loadPresents() {
    clearPresentsContainer();
    let presentsData = await getPresentsData();

    for (const present of Object.values(presentsData)) {
        createPresentElement(...Object.values(present))
    }

    attachEventListeners()
}

async function addPresent(e) {
    e.preventDefault()
    const tokens = getInputFields()
    if (tokens.some(x => x.value === "")) {
        return
    }

    let newPresent = {
        gift: tokens[0],
        for: tokens[1],
        price: tokens[2]
    }

    try {
        await fetch(baseURL, {method:"post", body: JSON.stringify(newPresent)})
        clearInputFields()
        await loadPresents(e)
    } catch (error) {
        console.log(error)
    }
}

async function editPresent(e) {
    const presentId = e.target.dataset.presentId
    const tokens = getInputFields()
    if (tokens.some(x => x.value === "")) {
        return
    }
    const newPresent = {
        gift: tokens[0],
        for: tokens[1],
        price: tokens[2],
        _id: presentId,
    }

    try {
        await fetch(baseURL + presentId, { method: "put", body: JSON.stringify(newPresent) });
        enableAddBtn()
        await loadPresents(e)
    } catch (error) {
        console.log(error)        
    }
}

async function deletePresent(e) {
    const presentId = e.target.closest("div.gift-sock").id
    try {
        await fetch(baseURL + presentId, { method: "delete" });
        await loadPresents(e)
    } catch (error) {
        console.log(error)        
    }
}

function createPresentElement(giftTitle, recipient, price, giftId){
    let giftElement = createElement("div", presentsContainer, null, ["gift-sock"], giftId);
    
    let contentElement = createElement("div", giftElement, null, ["content"])
    let giftTitleElement = createElement("p", contentElement, giftTitle)
    let recepientElement = createElement("p", contentElement, recipient)
    let priceElement = createElement("p", contentElement, price)

    let buttonsContainer = createElement("div", giftElement, null, ["buttons-container"])
    let changeBtn = createElement("button", buttonsContainer, "Change", ["change-btn"])
    let deleteBtn = createElement("button", buttonsContainer, "Delete", ["delete-btn"])

}

function attachEventListeners() {
    const changeButtons = Array.from(document.querySelectorAll("button.change-btn"))
    changeButtons.forEach(btn => btn.addEventListener("click", fillInputForm))

    const deleteButtons = Array.from(document.querySelectorAll("button.delete-btn"))
    deleteButtons.forEach(btn => btn.addEventListener("click", deletePresent))
}

function fillInputForm(e) {
    e.preventDefault()
    const presentElement = e.target.closest("div.gift-sock")
    let presentId = presentElement.id
    inputSelectors[0].value = presentElement.querySelector("p:nth-child(1)").textContent
    inputSelectors[1].value = presentElement.querySelector("p:nth-child(2)").textContent
    inputSelectors[2].value = presentElement.querySelector("p:nth-child(3)").textContent
    editPresentBtn.dataset.presentId = presentId
    disableAddBtn();
}

// HELPERS:
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

function getInputFields () {
    return inputSelectors.map((x) => x.value);
}

function clearInputFields () {
    inputSelectors.forEach((x) => (x.value = ""));
}

function clearPresentsContainer() {
    presentsContainer.innerHTML = ""
}

function disableAddBtn() {
    addPresentBtn.setAttribute("disabled", true)
    editPresentBtn.removeAttribute("disabled")
}

function enableAddBtn() {
    addPresentBtn.removeAttribute("disabled")
    editPresentBtn.setAttribute("disabled", true)
}
