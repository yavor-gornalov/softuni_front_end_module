// TODO
function attachEvents() {
    const baseURL = "http://localhost:3030/jsonstore/tasks/";

    const titleElement = document.querySelector("input#title");
    const todoListContainer = document.getElementById("todo-list");
    const loadBtn = document.querySelector("#load-button");
    const addBtn = document.querySelector("#add-button");

    loadBtn.addEventListener("click", loadAllTasks);
    addBtn.addEventListener("click", addTask);

    async function loadAllTasks(e) {
        e.preventDefault();
        try {
            todoListContainer.innerHTML = "";
            const response = await fetch(baseURL, { method: "get" });
            const records = await response.json();
            createToDoList(records);
            addEventListeners();
        } catch (error) {
            console.log(error);
        }
    }

    async function addTask(e) {
        e.preventDefault(e);
        const taskTitle = titleElement.value;
        if (!taskTitle) return;
        newTask = { name: taskTitle };
        try {
            await fetch(baseURL, {
                method: "post",
                body: JSON.stringify(newTask),
            });
            titleElement.value = "";
            await loadAllTasks(e);
        } catch (error) {
            console.log(error);
        }
    }

    function createToDoList(records) {
        for (const { name, _id } of Object.values(records)) {
            const listElement = document.createElement("li");
            listElement.dataset.taskId = _id;

            const taskElement = document.createElement("span");
            taskElement.textContent = name;
            listElement.appendChild(taskElement);

            const removeBtn = document.createElement("button");
            removeBtn.textContent = "Remove";
            listElement.appendChild(removeBtn);

            const editBtn = document.createElement("button");
            editBtn.textContent = "Edit";
            listElement.appendChild(editBtn);

            todoListContainer.appendChild(listElement);
        }
    }

    function addEventListeners() {
        const editBtns = Array.from(document.querySelectorAll("button")).filter(
            (x) => x.textContent === "Edit"
        );
        const removeBtns = Array.from(document.querySelectorAll("button")).filter(
            (x) => x.textContent === "Remove"
        );

        removeBtns.forEach((removeBtn) => removeBtn.addEventListener("click", removeTask));
        editBtns.forEach((editBtn) => editBtn.addEventListener("click", editListItem));
    }

    async function removeTask(e) {
        const taskElement = e.currentTarget.closest("li");
        const taskId = taskElement.dataset.taskId;

        try {
            await fetch(baseURL + taskId, { method: "delete" });
            await loadAllTasks(e);
        } catch (error) {
            console.log(error);
        }
    }

    function editListItem(e) {
        e.preventDefault();
        const taskElement = e.currentTarget.closest("li");

        const [span, removeBtn, editBtn] = Array.from(taskElement.children);
        taskElement.innerHTML = "";

        const taskInputElement = document.createElement("input");
        taskInputElement.value = span.textContent;

        const submitBtn = document.createElement("button");
        submitBtn.textContent = "Submit";
        submitBtn.addEventListener("click", putTask);

        taskElement.appendChild(taskInputElement);
        taskElement.appendChild(removeBtn);
        taskElement.appendChild(submitBtn);
    }

    async function putTask(e) {
        e.preventDefault();
        const currentListItem = e.currentTarget.closest("li")
        const taskId = currentListItem.dataset.taskId;
        const taskName = currentListItem.querySelector("input").value;

        if (!taskName) return;

        const newTask = {
            name: taskName,
            _id: taskId,
        };

        try {
            await fetch(baseURL + taskId, { method: "put", body: JSON.stringify(newTask) });
            await loadAllTasks(e);
        } catch (error) {
            console.log(error);
        }
    }
}

attachEvents();
