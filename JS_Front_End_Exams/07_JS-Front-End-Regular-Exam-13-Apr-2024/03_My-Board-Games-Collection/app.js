const baseURL = "http://localhost:3030/jsonstore/games/"

// Selectors
const inputSelectors = document.querySelectorAll("#form input")

// Containers
const gamesListContainer = document.querySelector("div#games-list")

// Buttons
const loadGamesBtn = document.querySelector("button#load-games")
const addGameBtn = document.querySelector("button#add-game")
const editGameBtn = document.querySelector("button#edit-game")

// EventListeners
loadGamesBtn.addEventListener("click", loadGames)
addGameBtn.addEventListener("click", addGame)
editGameBtn.addEventListener("click", editGame)

async function loadGames(e) {
    e.preventDefault()

    const response = await fetch(baseURL)
    const gameData = await response.json()

    gamesListContainer.innerHTML = ""
    for (const game of Object.values(gameData)) {
    let tokens = Object.values(game)

        let gameElement = createGameElement(tokens)
        gamesListContainer.appendChild(gameElement)
    }
    // TODO: Check activation of addGameBtn
    enableButton(addGameBtn)
    disableBtn(editGameBtn)
}

async function addGame (e) {;
    e.preventDefault()

    let tokens = getInputValues(inputSelectors)
    
    if (tokens.some(val => val ==="")) return;

    let [name, type, players] = tokens
    let newGame = {
        name, 
        type,
        players
    }

    await fetch (baseURL, {method:"post", body:JSON.stringify(newGame)})
    clearInputFields(inputSelectors)
    await loadGames(e)
}

async function editGame (e) {
    e.preventDefault()

    let tokens = getInputValues(inputSelectors)
    let gameId = e.target.dataset.gameId

    if (tokens.some(val => val ==="")) return;

    let [name, type, players] = tokens
    let newGame = {
        name, 
        type,
        players,
        _id: gameId
    }

    await fetch(baseURL + gameId, { method: "put", body: JSON.stringify(newGame) });
    clearInputFields(inputSelectors)
    await loadGames(e)

}

async function deleteGame (e) {
    e.preventDefault()
    let gameId = e.target.parentElement.id
    console.log("click")
    console.log(gameId)

    await fetch(baseURL + gameId, {method:"delete"})
    await loadGames(e)
}

function fillEditForm(e, tokens) {
    e.preventDefault()
    editGameBtn.dataset.gameId = tokens.pop() 

    for(let i = 0; i< tokens.length; i++) {
        inputSelectors[i].value = tokens[i]
    }

    disableBtn(addGameBtn)
    enableButton(editGameBtn)
}

function createGameElement(tokens) {
    [ name, type, players, _id] = tokens

    let gameElement = createElement("div", null, null, ["board-game"], _id)
    let contentElement = createElement("div", gameElement, null, ["content"])
    let nameElement = createElement("p", contentElement, name)
    let typeElement = createElement("p", contentElement, type)
    let playersElement = createElement("p", contentElement, players)
    
    let buttonsContainer = createElement("div", gameElement, null, ["buttons-container"])
    let changeBtn = createElement("button", buttonsContainer, "Change", ["change-btn"])
    let deleteBnt = createElement("button", gameElement, "Delete", ["delete-btn"])

    changeBtn.addEventListener("click", (e) => fillEditForm(e, tokens))
    deleteBnt.addEventListener("click", deleteGame)

    return gameElement
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
}

function enableButton(button) {
    button.disabled = ""
}