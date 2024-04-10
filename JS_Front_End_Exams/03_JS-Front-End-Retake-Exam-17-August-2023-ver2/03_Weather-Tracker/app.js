const baseURL = "http://localhost:3030/jsonstore/tasks/"

const inputSelectors = document.querySelectorAll("div#form input")
const forecastContainer = document.querySelector("div#list")

const loadHistoryBtn= document.querySelector("#load-history")
const [addForecastBtn, editForecastBtn] = document.querySelectorAll("div#form button")

loadHistoryBtn.addEventListener("click", loadHistory)
addForecastBtn.addEventListener("click", addForecast)
editForecastBtn.addEventListener("click", editForecast)

async function loadHistory(e) {
    e.preventDefault()
    let response = await fetch(baseURL)
    let data = await response.json()

    forecastContainer.innerHTML = ""
    for (const record of Object.values(data)) {
        let tokens = Object.values(record)
        createForecastElement(forecastContainer, tokens)
    }
}

async function addForecast(e) {
    e.preventDefault()
    let tokens = getInputValues(inputSelectors)

    if (tokens.some(val => val === "")) return
    
    let [location, temperature, date] = tokens
    let newForecast = {
        location,
        temperature,
        date
    }

    await fetch(baseURL, {method:"post", body:JSON.stringify(newForecast)})
    clearInputFields(inputSelectors)
    await loadHistory(e)
}

async function editForecast(e) {
    let tokens = getInputValues(inputSelectors)
    let _id = e.target.dataset._id

    if (tokens.some(val => val==="")) return

    let [location, temperature, date] = tokens
    let editedForecast = {
        location,
        temperature,
        date,
        _id,
    }

    await fetch(baseURL + _id, {method:"put", body: JSON.stringify(editedForecast)})
    clearInputFields(inputSelectors)
    await loadHistory(e)
    enableButton(addForecastBtn)
    disableBtn(editForecastBtn)
}

function createForecastElement(parentElement, tokens) {
    let [location, temperature, date, _id] = tokens

    let forecastElement = createElement("div", parentElement,null, ["container"] )
    let locationElement = createElement("h2", forecastElement, location)
    let dateElement = createElement("h3", forecastElement, date)
    let temperatureElement = createElement("h3", forecastElement, temperature, null, "celsius" )
    let buttonsContainer = createElement("div", forecastElement, null, ["buttons-container"])
    let changeBtn = createElement("button", buttonsContainer, "Change", ["change-btn"])
    let deleteBtn = createElement("button", buttonsContainer, "Delete", ["delete-btn"])

    changeBtn.addEventListener("click", (e)=>{
        e.preventDefault()
        inputSelectors[0].value = location
        inputSelectors[1].value = temperature
        inputSelectors[2].value = date

        forecastElement.remove()
        enableButton(editForecastBtn)
        disableBtn(addForecastBtn)

        editForecastBtn.dataset._id = _id
    })

    deleteBtn.addEventListener("click", async(e) => {
        await fetch(baseURL+_id, {method:"delete"})
        await loadHistory(e)
    })
}

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
    button.setAttribute("disabled", true)
}

function enableButton(button) {
    button.removeAttribute("disabled")
}