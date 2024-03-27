window.addEventListener("load", solve);

function solve() {
    const firstNameField = document.getElementById("first-name");
    const lastNameField = document.getElementById("last-name");
    const ageField = document.getElementById("age");
    const storyTitleField = document.getElementById("story-title");
    const genreField = document.getElementById("genre");
    const storyField = document.getElementById("story");
    const publishBtn = document.getElementById("form-btn");
    const previewList = document.getElementById("preview-list");
    const mainElement = document.getElementById("main");

    publishBtn.addEventListener("click", publishData);

    function publishData(e) {
        e.preventDefault();
        const tokens = getInputValues();
        resetInputValues();
        for (const field of tokens) {
            if (!field) return;
        }

        const newListItem = createListItem(tokens);

        clearPreviewList();
        previewList.appendChild(newListItem);
        publishBtn.disabled = "disabled";
    }

    function createListItem(tokens) {
        const [firstName, lastName, age, storyTitle, genre, story] = tokens;

        const newListItem = document.createElement("li");
        newListItem.classList.add("story-info");

        const articleElement = document.createElement("article");
        newListItem.appendChild(articleElement);

        const authorElement = document.createElement("h4");
        authorElement.textContent = `Name: ${firstName} ${lastName}`;
        articleElement.appendChild(authorElement);

        const ageElement = document.createElement("p");
        ageElement.textContent = `Age: ${age}`;
        articleElement.appendChild(ageElement);

        const titleElement = document.createElement("p");
        titleElement.textContent = `Title: ${storyTitle}`;
        articleElement.appendChild(titleElement);

        const genreElement = document.createElement("p");
        genreElement.textContent = `Genre: ${genre}`;
        articleElement.appendChild(genreElement);

        const storyElement = document.createElement("p");
        storyElement.textContent = story;
        articleElement.appendChild(storyElement);

        const saveBtn = document.createElement("button");
        saveBtn.classList.add("save-btn");
        saveBtn.textContent = "Save Story";
        newListItem.appendChild(saveBtn);

        const editBtn = document.createElement("button");
        editBtn.classList.add("edit-btn");
        editBtn.textContent = "Edit Story";
        newListItem.appendChild(editBtn);

        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-btn");
        deleteBtn.textContent = "Delete Story";
        newListItem.appendChild(deleteBtn);

        saveBtn.addEventListener("click", saveStory);
        editBtn.addEventListener("click", editStory);
        deleteBtn.addEventListener("click", deleteStory);

        function saveStory() {
            const message = document.createElement("h1");
            message.textContent = "Your scary story is saved!";
            mainElement.innerHTML = "";
            mainElement.appendChild(message);
        }

        function editStory() {
            clearPreviewList();
            firstNameField.value = firstName;
            lastNameField.value = lastName;
            ageField.value = age;
            storyTitleField.value = storyTitle;
            genreField.value = genre;
            storyField.value = story;
            publishBtn.disabled = "";
        }

        function deleteStory() {
            clearPreviewList();
            publishBtn.disabled = "";
        }

        return newListItem;
    }

    // HELPERS
    function getInputValues() {
        return [
            firstNameField.value,
            lastNameField.value,
            ageField.value,
            storyTitleField.value,
            genreField.value,
            storyField.value,
        ];
    }

    function resetInputValues() {
        firstNameField.value = "";
        lastNameField.value = "";
        ageField.value = "";
        storyTitleField.value = "";
        genreField.value = "";
        storyField.value = "";
    }

    function clearPreviewList() {
        const headerElement = document.createElement("h3");
        headerElement.textContent = "Preview";

        previewList.innerHTML="";
        previewList.appendChild(headerElement);
    }
}
