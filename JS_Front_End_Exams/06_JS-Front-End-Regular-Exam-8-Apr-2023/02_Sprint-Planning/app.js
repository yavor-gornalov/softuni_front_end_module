window.addEventListener("load", solve);

function solve() {
    const taskIdField = document.getElementById("task-id");
    const titleField = document.getElementById("title");
    const descriptionField = document.getElementById("description");
    const labelField = document.getElementById("label");
    const pointsField = document.getElementById("points");
    const assigneeField = document.getElementById("assignee");
    const tasksSection = document.getElementById("tasks-section")
    const totalPointsElement = document.getElementById("total-sprint-points");

    const createTaskBtn = document.getElementById("create-task-btn");
    createTaskBtn.addEventListener("click", createTask);

    const deleteTaskBtn = document.getElementById("delete-task-btn");
    deleteTaskBtn.addEventListener("click", deleteTask);

    function createTask(e) {
        e.preventDefault();
        const [title, description, label, points, assignee] = getInputValues();
        if (!title || !description || !label || !points || !assignee) {
            return;
        }

        const taskId = Array.from(document.querySelectorAll(".task-card")).length + 1
        const taskElement = createTaskElement(
            title,
            description,
            label,
            points,
            assignee,
            `task-${taskId}`
        );
        
        tasksSection.appendChild(taskElement);
        
        clearTasksSection();
        calculateTasksSum()
        clearInputFields();
    }

    function deleteTask(e) {
        e.preventDefault();

        let taskId = taskIdField.value;
        document.getElementById(`${taskId}`).remove();

        clearInputFields();
        activateInputFields();
        activateCreateTaskBtn();
        calculateTasksSum()
    }

    function createTaskElement(title, description, label, points, assignee, taskId) {
        const taskContainer = document.createElement("article");
        taskContainer.classList.add("task-card");
        taskContainer.id = taskId;

        const labelElement = document.createElement("div");
        labelElement.classList.add("task-card-label");
        switch (label.toLowerCase()) {
            case "feature": {
                labelElement.classList.add("feature");
                labelElement.innerHTML = `${label} &#8865`;
                break;
            }
            case "low priority bug": {
                labelElement.classList.add("low-priority");
                labelElement.innerHTML = `${label} &#9737`;
                break;
            }
            case "high priority bug": {
                labelElement.classList.add("high-priority");

                labelElement.innerHTML = `${label} &#9888`;
                break;
            }
        }
        const titleElement = document.createElement("h3");
        titleElement.classList.add("task-card-title");
        titleElement.textContent = title;

        const descriptionElement = document.createElement("p");
        descriptionElement.classList.add("task-card-description");
        descriptionElement.textContent = description;

        const pointsElement = document.createElement("div");
        pointsElement.classList.add("task-card-points");
        pointsElement.textContent = `Estimated at ${points} pts`;

        const assigneeElement = document.createElement("div");
        assigneeElement.classList.add("task-card-assignee");
        assigneeElement.textContent = `Assigned to: ${assignee}`;

        const actionsElement = document.createElement("div");
        actionsElement.classList.add("task-card-actions");

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", confirmDelete);

        actionsElement.appendChild(deleteBtn);

        taskContainer.appendChild(labelElement);
        taskContainer.appendChild(titleElement);
        taskContainer.appendChild(descriptionElement);
        taskContainer.appendChild(pointsElement);
        taskContainer.appendChild(assigneeElement);
        taskContainer.appendChild(actionsElement);

        function confirmDelete(e) {
            e.preventDefault();

            titleField.value = title;
            descriptionField.value = description;
            labelField.value = label;
            pointsField.value = points;
            assigneeField.value = assignee;
            taskIdField.value = taskId;

            deactivateInputFields();
            deactivateCreateTaskBtn();
        }
        return taskContainer;
    }

    function clearTasksSection() {
        let articles = Array.from(
            tasksSection.querySelectorAll("tasks-selection>article.taskcard")
        );

        articles.forEach((article) => {
            article.remove();
        });
    }

    function getInputValues() {
        return [
            titleField.value,
            descriptionField.value,
            labelField.value,
            pointsField.value,
            assigneeField.value,
        ];
    }

    function clearInputFields() {
        titleField.value = "";
        descriptionField.value = "";
        labelField.value = "";
        pointsField.value = "";
        assigneeField.value = "";
    }

    function activateInputFields() {
        titleField.disabled = false;
        descriptionField.disabled = false;
        labelField.disabled = false;
        pointsField.disabled = false;
        assigneeField.disabled = false;
    }

    function deactivateInputFields() {
        titleField.disabled = true;
        descriptionField.disabled = true;
        labelField.disabled = true;
        pointsField.disabled = true;
        assigneeField.disabled = true;
    }

    function activateCreateTaskBtn() {
        createTaskBtn.disabled = false;
        deleteTaskBtn.disabled = true;
    }

    function deactivateCreateTaskBtn() {
        createTaskBtn.disabled = true;
        deleteTaskBtn.disabled = false;
    }

    function calculateTasksSum() {
        let totalPoints = 0
        Array.from(document.querySelectorAll(".task-card-points")).forEach(p => {
            totalPoints += Number(p.textContent.split(" ")[2])
        })

        totalPointsElement.textContent = `Total Points ${totalPoints}pts`;
    }
}
