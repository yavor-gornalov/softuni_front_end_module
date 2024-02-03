window.addEventListener("load", solve);

function solve() {
    const todoContainer = document.querySelector("#task-list");
    const doneContainer = document.querySelector("#done-list");
    const addBtn = document.querySelector("#add-btn");

    addBtn.addEventListener("click", (e) => {
        console.log("add clicked!");
        const [placeField, actionField, personField] = document.querySelectorAll("input:not([id='add-btn'])");

        const newTask = document.createElement("li");
        newTask.classList.add("clean-task");

        const article = document.createElement("article");

        const place = document.createElement("p");
        place.textContent = `Place:${placeField.value}`;
        placeField.value = "";

        const action = document.createElement("p");
        action.textContent = `Action:${actionField.value}`;
        actionField.value = "";
        const person = document.createElement("p");
        person.textContent = `Person:${personField.value}`;
        personField.value = "";

        Array.from([place, action, person]).forEach((element) => {
            article.appendChild(element);
        });

        newTask.appendChild(article);

        const divButtons = document.createElement("div");
        divButtons.classList.add("buttons");

        const editBtn = document.createElement("button");
        editBtn.classList.add("edit");
        editBtn.textContent = "Edit";
        editBtn.addEventListener("click", () => {
            placeField.value = place.textContent.replace("Place:", "");
            actionField.value = action.textContent.replace("Action:", "");
            personField.value = person.textContent.replace("Person:", "");
            newTask.remove();
        });

        const doneBtn = document.createElement("button");
        doneBtn.classList.add("done");
        doneBtn.textContent = "Done";
        doneBtn.addEventListener("click", () => {
            divButtons.remove();
            const deleteBtn = document.createElement("button");
            deleteBtn.classList.add("delete");
            deleteBtn.textContent = "Delete";
            newTask.appendChild(deleteBtn);
            deleteBtn.addEventListener("click", () => {
                newTask.remove();
            });
            doneContainer.appendChild(newTask);
        });

        divButtons.appendChild(editBtn);
        divButtons.appendChild(doneBtn);
        newTask.appendChild(divButtons);
        todoContainer.appendChild(newTask);
    });
}
