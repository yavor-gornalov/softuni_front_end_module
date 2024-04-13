window.addEventListener("load", solve);

function solve() {
    const inputSelectors = document.querySelectorAll(
        ".newPostContent input, .newPostContent textarea"
    );
    const reviewListContainer = document.querySelector("#review-list");
    const publishedListContainer = document.querySelector("#published-list");

    const publishBtn = document.querySelector("#publish-btn");
    publishBtn.addEventListener("click", publishTask);

    function publishTask(e) {
        e.preventDefault();
        const tokens = getInputValues(inputSelectors);
        if (tokens.some((val) => val === "")) return;

        const taskElement = createTaskElement(tokens);

        reviewListContainer.appendChild(taskElement);

        clearInputFields(inputSelectors);
    }

    function populateInputForm(e, tokens) {
        e.preventDefault();
        e.target.parentElement.remove();

        for (let i = 0; i < inputSelectors.length; i++) {
            inputSelectors[i].value = tokens[i];
        }
    }

    function postTask(e) {
        e.preventDefault();
        const taskElement = e.target.parentElement;
        Array.from(taskElement.querySelectorAll("button")).forEach((button) => button.remove());
        publishedListContainer.appendChild(taskElement);
    }

    function createTaskElement(tokens) {
        let [title, category, content] = tokens;

        let taskElement = createElement("li", null, null, ["rpost"]);
        let articleElement = createElement("article", taskElement);
        let titleElement = createElement("h4", articleElement, title);
        let categoryElement = createElement("p", articleElement, `Category: ${category}`);
        let contentElement = createElement("p", articleElement, `Content: ${content}`);
        let editBtn = createElement("button", taskElement, "Edit", ["action-btn", "edit"]);
        let postBtn = createElement("button", taskElement, "Post", ["action-btn", "post"]);

        editBtn.addEventListener("click", (e) => populateInputForm(e, tokens));
        postBtn.addEventListener("click", postTask);

        return taskElement;
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
}
