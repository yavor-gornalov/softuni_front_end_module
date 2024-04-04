// TODO:
function attachEvents() {
    const baseURL = "http://localhost:3030/jsonstore/tasks/";

    const titleField = document.getElementById("title");
    const descriptionField = document.getElementById("description");
    const todoSection = document.querySelector("#todo-section>.task-list");
    const inProcessSection = document.querySelector("#in-progress-section>.task-list");
    const codeReviewSection = document.querySelector("#code-review-section>.task-list");
    const doneSection = document.querySelector("#done-section>.task-list");

    const moveBtnTextMap = {
        ToDo: "Move to In Progress",
        "In Progress": "Move to Code Review",
        "Code Review": "Move to Done",
        Done: "Close",
    };

    const eventListenersMap = {
        "Move to In Progress": "In Progress",
        "Move to Code Review":"Code Review",
        "Move to Done": "Done"
    };

    const sectionMap = {
        ToDo: todoSection,
        "In Progress": inProcessSection,
        "Code Review": codeReviewSection,
        Done: doneSection,
    };

    const loadBoardBtn = document.getElementById("load-board-btn");
    loadBoardBtn.addEventListener("click", loadTasks);

    const createTaskBtn = document.getElementById("create-task-btn");
    createTaskBtn.addEventListener("click", createTask);

    async function createTask(e) {
        e.preventDefault();

        const [title, description] = getInputValues();

        if (!title || !description) return;

        const newTask = {
            title,
            description,
            status: "ToDo",
        };

        try {
            await fetch(baseURL, { method: "post", body: JSON.stringify(newTask) });
            clearInputFields();
            await loadTasks(e);
        } catch (error) {
            console.log(error);
        }
    }

    async function loadTasks(e) {
        e.preventDefault();
        clearTasksContainers();

        let data = await fetchTaskData();

        createTaskElements(data);
        attachEventListeners ();
    }

    function attachEventListeners() {
        const buttons = document.querySelectorAll("li.task>button")
        Array.from(buttons).forEach(button =>{
            let newStatus = eventListenersMap[button.textContent]
            if (!newStatus) {
                button.addEventListener("click", async (e)=> {
                    e.preventDefault()
                    let taskId = e.target.dataset.taskId
                    try {
                        await fetch(baseURL+ taskId, {method:"delete"})
                        await loadTasks(e)
                    } catch (error) {
                        console.log(error);
                    }
                })
            } else {
                button.addEventListener("click", async (e) => {
                    e.preventDefault()
                    let title = e.target.parentElement.querySelector("h3").textContent;
                    let description = e.target.parentElement.querySelector("p").textContent;
                    let taskId = e.target.dataset.taskId;

                    let editedTask = {
                        title,
                        status:newStatus,
                        description,
                        _id: taskId,
                    };
                    try {
                        await fetch(baseURL + taskId, {
                            method: "put",
                            body: JSON.stringify(editedTask),
                        });
                        await loadTasks(e);
                    } catch (error) {
                        console.log(error);
                    }
                });
            }
        })
    }

    async function fetchTaskData() {
        try {
            const response = await fetch(baseURL, { method: "get" });
            const taskData = await response.json();
            return taskData;
        } catch (error) {
            console.log(error);
        }
    }

    function clearTasksContainers() {
        Array.from(document.querySelectorAll(".task-list")).forEach((container) => {
            container.innerHTML = "";   
        });
    }

    function createTaskElements(data) {
        for (const record of Array.from(Object.values(data))) {
            let description = record.description;
            let status = record.status;
            let title = record.title;
            let taskId = record._id;

            const taskContainer = document.createElement("li");
            taskContainer.classList.add("task");

            const titleElement = document.createElement("h3");
            titleElement.textContent = title;

            const descriptionElement = document.createElement("p");
            descriptionElement.textContent = description;

            const moveBtn = document.createElement("button");
            moveBtn.textContent = moveBtnTextMap[status];
            moveBtn.dataset.taskId = taskId

            taskContainer.appendChild(titleElement);
            taskContainer.appendChild(descriptionElement);
            taskContainer.appendChild(moveBtn);

            sectionMap[status].appendChild(taskContainer);

        }
    }

    function getInputValues() {
        return [titleField.value, descriptionField.value];
    }

    function clearInputFields() {
        titleField.value = "";
        descriptionField.value = "";
    }
}

attachEvents();
