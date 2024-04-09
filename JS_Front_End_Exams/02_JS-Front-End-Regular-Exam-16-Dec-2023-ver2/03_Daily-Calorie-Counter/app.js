const baseURL = "http://localhost:3030/jsonstore/tasks/";

const inputSelectors = document.querySelectorAll("form input");
const mealsListContainer = document.querySelector("#list");

const loadMealsBtn = document.querySelector("#load-meals");
loadMealsBtn.addEventListener("click", loadMeals);

const addMealBtn = document.querySelector("#add-meal");
addMealBtn.addEventListener("click", addMeal);

async function loadMeals(e) {
    e.preventDefault();
    const response = await fetch(baseURL);
    const data = await response.json();

    mealsListContainer.innerHTML = "";

    Object.values(data).forEach((record) => {
        let tokens = Object.values(record);

        createMealElement(tokens);
    });
}

async function addMeal(e) {
    e.preventDefault();
    let tokens = getInputValues(inputSelectors);
    clearInputFields(inputSelectors);

    if (tokens.some((val) => val === "")) return;

    newMeal = {
        food: tokens[0],
        time: tokens[1],
        calories: tokens[2],
    };
    console.log(newMeal);
    await fetch(baseURL, { method: "post", body: JSON.stringify(newMeal) });

    loadMeals(e);
    clearInputFields(inputSelectors);
}

const editMealBtn = document.querySelector("#edit-meal");
editMealBtn.addEventListener("click", editMeal);

async function editMeal(e) {
    e.preventDefault();
    let _id = e.target.dataset._id;
    let [food, calories, time] = getInputValues(inputSelectors);
    clearInputFields(inputSelectors);

    let editedMeal = {
        food,
        calories,
        time,
        _id,
    };

    await fetch(baseURL + _id, { method: "put", body: JSON.stringify(editedMeal) });
    enableButton(addMealBtn);
    disableBtn(editMealBtn);
    await loadMeals(e);
}

function createMealElement(tokens) {
    let [food, calories, time, _id] = tokens;

    let mealElement = createElement("div", mealsListContainer, null, ["meal"]);
    let foodElement = createElement("h2", mealElement, food);
    let timeElement = createElement("h3", mealElement, time);
    let caloriesElement = createElement("h3", mealElement, calories);
    let mealButtonsElement = createElement("div", mealElement, null, null, "meal-buttons");
    let changeBtn = createElement("button", mealButtonsElement, "Change", ["change-meal"]);
    let deleteBtn = createElement("button", mealButtonsElement, "Delete", ["delete-meal"]);

    changeBtn.addEventListener("click", (e) => {
        e.preventDefault();
        editMealBtn.dataset._id = _id;
        mealElement.remove();

        // for (let idx = 0; idx < inputSelectors.length; idx++) {
        //     inputSelectors[idx].value = tokens[idx];
        // }

        inputSelectors[0].value = food
        inputSelectors[1].value = time
        inputSelectors[2].value = calories

        enableButton(editMealBtn);
        disableBtn(addMealBtn);
    });

    deleteBtn.addEventListener("click", async (e) => {
        e.preventDefault();
        await fetch(baseURL + _id, { method: "delete" });
        await loadMeals(e);
    });
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
    button.setAttribute("disabled", true);
}

function enableButton(button) {
    button.removeAttribute("disabled");
}
