window.addEventListener('load', solve);

function solve() {
    const labelToIconMap = {
        'Feature': '&#8865;',
        'Low Priority Bug': '&#9737;',
        'High Priority Bug': '&#9888;',
    };
    const labelNameToClassMap = {
        'Feature': 'feature',
        'Low Priority Bug': 'low-priority',
        'High Priority Bug': 'high-priority',
    };
    const tasks = {};
    const inputDOMSelectors = {
        title: document.getElementById('title'),
        description: document.getElementById('description'),
        label: document.getElementById('label'),
        points: document.getElementById('points'),
        assignee: document.getElementById('assignee'),
    };

    const otherDOMSelectors = {
        createBtn: document.getElementById('create-task-btn'),
        deleteBtn: document.getElementById('delete-task-btn'),
        tasksSection: document.getElementById('tasks-section'),
        totalSprintPoints: document.getElementById('total-sprint-points')
    };

    otherDOMSelectors.createBtn.addEventListener('click', createTaskHandler);
    otherDOMSelectors.deleteBtn.addEventListener('click', deleteTaskHandler);

    function createTaskHandler() {
        const { title, description, label, points, assignee } = inputDOMSelectors;
        const hasInvalidInputValue = Object.values(inputDOMSelectors)
            .some((input) => input.value === '');
        if (hasInvalidInputValue) {
            return;
        }

        const taskId = `task-${Object.keys(tasks).length + 1}`;
        const article = createElement('article', null, otherDOMSelectors.tasksSection, ['task-card'], taskId);
        createElement('div', `${label.value} ${labelToIconMap[label.value]}`, article, ['task-card-label', labelNameToClassMap[label.value]], null, true);
        createElement('h3', `${title.value}`, article, ['task-card-title']);
        createElement('p', `${description.value}`, article, ['task-card-description']);
        createElement('div', `Estimated at ${points.value} pts`, article, ['task-card-points']);
        createElement('div', `Assigned to: ${assignee.value}`, article, ['task-card-assignee']);
        const taskCardActions = createElement('div', '', article, ['task-card-actions']);
        const deleteBtn = createElement('button', 'Delete', taskCardActions);
        deleteBtn.addEventListener('click', loadDeleteForm);
        tasks[taskId] = {
            title: title.value,
            description: description.value,
            label: label.value,
            points: points.value,
            assignee: assignee.value,
        };
        updateTotalPoints();
        clearInputFields();
    }

    function loadDeleteForm(e) {
        const taskId = e.target.parentNode.parentNode.getAttribute('id');
        document.getElementById('task-id').value = taskId;
        for (const key in inputDOMSelectors) {
            inputDOMSelectors[key].value = tasks[taskId][key];
        }
        Object.values(inputDOMSelectors)
            .forEach((input) => {
                input.setAttribute('disabled', true);
            })
        otherDOMSelectors.createBtn.setAttribute('disabled', true);
        otherDOMSelectors.deleteBtn.removeAttribute('disabled');
    }

    function deleteTaskHandler() {
        const taskId = document.getElementById('task-id').value;
        const taskToRemove = document.getElementById(taskId);
        taskToRemove.remove();
        delete tasks[taskId];
        otherDOMSelectors.deleteBtn.setAttribute('disabled', true);
        otherDOMSelectors.createBtn.removeAttribute('disabled');
        Object.values(inputDOMSelectors)
            .forEach((input) => {
                input.removeAttribute('disabled');
            });
        clearInputFields();
        updateTotalPoints();
    }

    function clearInputFields() {
        Object.values(inputDOMSelectors)
            .forEach((input) => {
                input.value = '';
            });
    }

    function updateTotalPoints() {
        const totalSprintPoints = Object.values(tasks).map((t) => Number(t.points)).reduce((a, b) => a + b, 0);
        otherDOMSelectors.totalSprintPoints.textContent = `Total Points ${totalSprintPoints}pts`;
    }

    function createElement(type, content, parentNode, classes, id, useInnerHtml) {
        const element = document.createElement(type);

        if (content && useInnerHtml) {
            element.innerHTML = content;
        } else {
            if (content && type !== 'input') {
                element.textContent = content;
            }

            if (content && type === 'input') {
                element.value = content;
            }
        }

        if (classes && classes.length > 0) {
            element.classList.add(...classes);
        }

        if (id) {
            element.setAttribute('id', id);
        }

        if (parentNode) {
            parentNode.appendChild(element);
        }

        return element;
    }
}