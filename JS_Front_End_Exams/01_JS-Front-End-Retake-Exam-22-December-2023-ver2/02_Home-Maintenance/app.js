window.addEventListener("load", solve);

function solve() {
    const currentTasksContainer = document.querySelector("#task-list");
    const doneTasksContainer = document.querySelector("#done-list");
    const inputSelectors = document.querySelectorAll("input:not([id='add-btn'])");
    const addBtn = document.querySelector("#add-btn");

    addBtn.addEventListener("click", (e) => {
        let tokens = getInputFields();

        if (tokens.some((x) => x === "")) {
            return;
        }

        createTaskElement(...tokens);

        clearInputFields();
    });

    function createTaskElement(place, action, person) {
        let newTask = createElement("li", currentTasksContainer, null, ["clean-task"]);
        let articleElement = createElement("article", newTask);
        let placeElement = createElement("p", articleElement, `Place:${place}`);
        let actionElement = createElement("p", articleElement, `Action:${action}`);
        let personElement = createElement("p", articleElement, `Person:${person}`);
        let buttonsContainer = createElement("div", newTask, null, ["buttons"]);
        let editBtn = createElement("button", buttonsContainer, "Edit", ["edit"]);
        let doneBtn = createElement("button", buttonsContainer, "Done", ["done"]);

        editBtn.addEventListener("click", () => {
            inputSelectors[0].value = place;
            inputSelectors[1].value = action;
            inputSelectors[2].value = person;
            newTask.remove();
        });

        doneBtn.addEventListener("click", () => {
            buttonsContainer.remove();
            let deleteBtn = createElement("button", newTask, "Delete", ["delete"]);
            deleteBtn.addEventListener("click", () => {
                newTask.remove();
            });
            doneTasksContainer.appendChild(newTask);
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

    function getInputFields() {
        return Array.from(inputSelectors).map((x) => x.value);
    }

    function clearInputFields() {
        Array.from(inputSelectors).forEach((x) => (x.value = ""));
    }
}
