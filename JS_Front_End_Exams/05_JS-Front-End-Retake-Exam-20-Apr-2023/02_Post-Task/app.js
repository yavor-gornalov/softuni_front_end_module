window.addEventListener("load", solve);

function solve() {
    const titleField = document.getElementById("task-title");
    const categoryField = document.getElementById("task-category");
    const contentField = document.getElementById("task-content");
    const reviewListContainer = document.getElementById("review-list");
    const publishedListContainer = document.getElementById("published-list");

    const publisBtn = document.getElementById("publish-btn");
    publisBtn.addEventListener("click", publishTask);

    function publishTask(e) {
        e.preventDefault();

        const [title, category, content] = getInputFields();

        if (!title || !category || !content) return;

        clearInputFields();
        clearReviewListContainer();

        const taskElement = createTaskElement(title, category, content);

        reviewListContainer.appendChild(taskElement);
    }

    function createTaskElement(title, category, content) {
        const taskElement = document.createElement("li");
        taskElement.classList.add("rpost");

        const articleElement = document.createElement("article");

        const titleElement = document.createElement("h4");
        titleElement.textContent = title;

        const categoryElement = document.createElement("p");
        categoryElement.textContent = `Category: ${category}`;

        const contentElement = document.createElement("p");
        contentElement.textContent = `Content: ${content}`;

        articleElement.appendChild(titleElement);
        articleElement.appendChild(categoryElement);
        articleElement.appendChild(contentElement);

        taskElement.appendChild(articleElement);

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.classList.add("action-btn");
        editBtn.classList.add("edit");
        editBtn.addEventListener("click", editTask);

        const postBtn = document.createElement("button");
        postBtn.textContent = "Post";
        postBtn.classList.add("action-btn");
        postBtn.classList.add("post");
        postBtn.addEventListener("click", postTask);

        taskElement.appendChild(editBtn);
        taskElement.appendChild(postBtn);

        function editTask(e) {
            e.preventDefault();
            titleField.value = title;
            categoryField.value = category;
            contentField.value = content;

            taskElement.remove();
        }

        function postTask(e) {
            e.preventDefault();
            editBtn.remove();
            postBtn.remove();

            publishedListContainer.appendChild(taskElement);
        }

        return taskElement;
    }

    // HELPERS:
    function getInputFields() {
        return [titleField.value, categoryField.value, contentField.value];
    }

    function clearInputFields() {
        titleField.value = "";
        categoryField.value = "";
        contentField.value = "";
    }

    function clearReviewListContainer() {
        reviewListContainer.innerHTML = "";
    }
}
