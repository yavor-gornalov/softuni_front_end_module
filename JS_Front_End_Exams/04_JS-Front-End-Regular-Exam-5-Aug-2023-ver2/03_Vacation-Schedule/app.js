const baseURL = "http://localhost:3030/jsonstore/tasks/";

const inputSelectors = [
    document.querySelector("#name"),
    document.querySelector("#num-days"),
    document.querySelector("#from-date"),
]

const vacationListContainer = document.querySelector("#list")

const loadVacationsBtn = document.querySelector("#load-vacations")
loadVacationsBtn.addEventListener("click", loadVacations)

const addVacationBtn = document.querySelector("#add-vacation")
addVacationBtn.addEventListener("click", addVacation)

const editVacationBtn = document.querySelector("#edit-vacation")
editVacationBtn.addEventListener("click", editVacation)
disableBtn(editVacation)

async function loadVacations(e) {
    e.preventDefault()

    let response = await fetch(baseURL)
    let vationsData = await response.json()

    vacationListContainer.innerHTML = ""
    for (const vacation of Object.values(vationsData)) {
        let vacationElement = createVacationElement(Object.values(vacation))
        vacationListContainer.appendChild(vacationElement)
    }
}

async function addVacation(e) {
    e.preventDefault()

    let tokens = getInputValues(inputSelectors)

    if (tokens.some(val => val =="")) return;

    let [name, days, date] = tokens
    newVacation = {
        name,
        days,
        date,
    }

    clearInputFields(inputSelectors)
    await fetch(baseURL, {method:"post", body:JSON.stringify(newVacation)})
    await loadVacations(e)
}

async function editVacation(e) {
    e.preventDefault();
    let tokens = getInputValues(inputSelectors);
    let _id = e.target.dataset._id;

    if (tokens.some((val) => val == "")) return;

    let [name, days, date] = tokens;
    let newVacation = {
        name,
        days,
        date,
        _id,
    };

    disableBtn(editVacation);
    enableButton(addVacation);
    await fetch(baseURL + _id, { method: "put", body: JSON.stringify(newVacation) });
    await loadVacations(e);
}

async function deleteVacation(e, _id) {
    e.preventDefault()
    await fetch(baseURL + _id, {method:"delete"})
    await loadVacations(e)
}

function fillFormData(e, tokens) {
    e.preventDefault()
    editVacationBtn.dataset._id = tokens.pop()
    for(let i = 0; i< inputSelectors.length; i++){
        inputSelectors[i].value = tokens[i]
    }
    disableBtn(addVacationBtn)
    enableButton(editVacationBtn)
}

function createVacationElement(tokens) {
    let [name, days, date, _id] = tokens
    let vacationElement = createElement("div", null, null, ["container"])
    let nameElement = createElement("h2", vacationElement, name)
    let dateElement = createElement("h3", vacationElement, date)
    let daysElement = createElement("h3", vacationElement, days)
    let changeBtn = createElement("button", vacationElement, "Change", ["change-btn"])
    let doneBtn = createElement("button", vacationElement, "Done", ["done-btn"])

    changeBtn.addEventListener("click", (e) => fillFormData(e, tokens))

    doneBtn.addEventListener("click", (e) => deleteVacation(e, _id))

    return vacationElement
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

function disableBtn(button) {
    button.disabled = "disabled"
    // button.setAttribute("disabled", true)
}

function enableButton(button) {
    button.disabled = ""
    // button.removeAttribute("disabled")
}
