const baseUrl = "http://localhost:3030/jsonstore/tasks/";

const mealsContainer = document.querySelector("#meals #list");
const foodField = document.querySelector("#form #food");
const timeField = document.querySelector("#form #time");
const caloriesField = document.querySelector("#form #calories");

const loadMealsBtn = document.querySelector("button#load-meals");
const addMealBtn = document.querySelector("button#add-meal");
const editMealBtn = document.querySelector("button#edit-meal");

loadMeals()

loadMealsBtn.addEventListener("click", loadMeals);
addMealBtn.addEventListener("click", addMeal);

async function addMeal() {
    const newMeal = createMealObject();
    clearFormInputs();

    if (!newMeal) return;
    console.log(newMeal);

    try {
        const response = await fetch(baseUrl, {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newMeal),
        });
        const data = response.json();

        loadMeals();
    } catch (error) {
        console.log(error);
    }
}

function loadMeals() {
    fetch(baseUrl, {
        method: "get",
        headers: { "Content-Type": "application/json" },
    })
        .then((res) => res.json())
        .then((data) => {
            mealsContainer.replaceChildren();
            Object.values(data).forEach((item) => {
                const args = Object.values(item);
                const newMealItem = createMealItem(args);
                mealsContainer.appendChild(newMealItem);
            });
        })
        .catch((err) => console.log(err));

    // try {
    //     const response = await fetch(baseUrl, {
    //         method: "get",
    //         headers: { "Content-Type": "application/json" },
    //     });
    //     const data = await response.json();
    //     mealsContainer.replaceChildren();
    //     Object.values(data).forEach((item) => {
    //         const args = Object.values(item);
    //         const newMealItem = createMealItem(args);
    //         mealsContainer.appendChild(newMealItem);
    //     });
    // } catch (err) {
    //     console.log(err);
    // }
}

function createMealItem(args) {
    const [food, calories, time, _id] = args;
    const mealItem = document.createElement("div");
    mealItem.setAttribute("class", "meal");
    mealItem.setAttribute("id", _id);

    const foodElement = document.createElement("h2");
    foodElement.textContent = food;
    mealItem.appendChild(foodElement);

    const caloriesElement = document.createElement("h3");
    caloriesElement.textContent = calories;
    mealItem.appendChild(caloriesElement);

    const timeElement = document.createElement("h3");
    timeElement.textContent = time;
    mealItem.appendChild(timeElement);

    const buttonsContainer = document.createElement("div");
    buttonsContainer.setAttribute("class", "meal-buttons");

    const changeBtn = document.createElement("button");
    changeBtn.textContent = "Change";
    changeBtn.setAttribute("class", "change-meal");
    changeBtn.addEventListener("click", changeMeal);
    buttonsContainer.appendChild(changeBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.setAttribute("class", "delete-meal");
    deleteBtn.addEventListener("click", deleteMeal);
    buttonsContainer.appendChild(deleteBtn);

    mealItem.appendChild(foodElement);
    mealItem.appendChild(caloriesElement);
    mealItem.appendChild(timeElement);
    mealItem.appendChild(buttonsContainer);

    // mealItem.innerHTML = `  <h2>${food}</h2>
    //                         <h3>${calories}</h3>
    //                         <h3>${time}</h3>
    //                         <div id="meal-buttons">
    //                             <button class="change-meal">Change</button>
    //                             <button class="delete-meal">Delete</button>
    //                         </div>`;

    return mealItem;
}

function clearFormInputs() {
    foodField.value = "";
    timeField.value = "";
    caloriesField.value = "";
}

function createMealObject() {
    const food = foodField.value;
    const time = timeField.value;
    const calories = caloriesField.value;

    if (!food || !time || !calories) return;

    return {
        food,
        calories,
        time,
    };
}

async function changeMeal(e) {
    e.preventDefault();
    addMealBtn.disabled = true;
    editMealBtn.disabled = false;
    const currentMeal = e.currentTarget.closest(".meal");
    foodField.value = currentMeal.querySelector(":nth-child(1)").textContent;
    caloriesField.value = currentMeal.querySelector(":nth-child(2)").textContent;
    timeField.value = currentMeal.querySelector(":nth-child(3)").textContent;

    editMealBtn.addEventListener("click", async () => {
        const editedMeal = createMealObject();
        clearFormInputs();

        if (!editedMeal) return;
        try {
            const response = await fetch(baseUrl + currentMeal.id, {
                method: "put",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editedMeal),
            });
            const data = await response.json();

            currentMeal.querySelector(":nth-child(1)").textContent = data.food;
            currentMeal.querySelector(":nth-child(2)").textContent = data.calories;
            currentMeal.querySelector(":nth-child(3)").textContent = data.time;

            clearFormInputs();
            addMealBtn.disabled = false;
            editMealBtn.disabled = true;
        } catch (error) {}
    });
}

async function deleteMeal(e) {
    e.preventDefault();
    try {
        const currentMeal = e.currentTarget.closest(".meal");
        await fetch(baseUrl + currentMeal.id, { method: "delete" });
        currentMeal.remove();
    } catch (error) {
        console.log(error);
    }
}
