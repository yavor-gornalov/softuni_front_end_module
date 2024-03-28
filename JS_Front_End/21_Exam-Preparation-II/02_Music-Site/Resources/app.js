window.addEventListener("load", solve);

function solve() {
    const genreElement = document.getElementById("genre");
    const nameElement = document.getElementById("name");
    const authorElement = document.getElementById("author");
    const dateElement = document.getElementById("date");
    const allHitsContainer = document.querySelector(".all-hits-container");
    const savedSongsContainer = document.querySelector(".saved-container");
    const likesCounterElement = document.querySelector(".likes>p");

    const addBtn = document.getElementById("add-btn");
    addBtn.addEventListener("click", addSong);

    function addSong(e) {
        e.preventDefault();
        const [genre, name, author, date] = getInputValues();
        if (!genre || !name || !author || !date) return;

        const divElement = document.createElement("div");
        divElement.classList.add("hits-info");

        const imgElement = document.createElement("img");
        imgElement.src = "./static/img/img.png";

        const genreElement = document.createElement("h2");
        genreElement.textContent = `Genre: ${genre}`;

        const nameElement = document.createElement("h2");
        nameElement.textContent = `Name: ${name}`;

        const authorElement = document.createElement("h2");
        authorElement.textContent = `Author: ${author}`;

        const dateElement = document.createElement("h3");
        dateElement.textContent = `Date: ${date}`;

        const saveBtn = document.createElement("button");
        saveBtn.classList.add("save-btn");
        saveBtn.textContent = "Save song";

        const likeBtn = document.createElement("button");
        likeBtn.classList.add("like-btn");
        likeBtn.textContent = "Like song";

        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-btn");
        deleteBtn.textContent = "Delete";

        divElement.appendChild(imgElement);
        divElement.appendChild(genreElement);
        divElement.appendChild(nameElement);
        divElement.appendChild(authorElement);
        divElement.appendChild(dateElement);
        divElement.appendChild(saveBtn);
        divElement.appendChild(likeBtn);
        divElement.appendChild(deleteBtn);

        allHitsContainer.appendChild(divElement);

        saveBtn.addEventListener("click", saveSong);
        likeBtn.addEventListener("click", likeSong);
        deleteBtn.addEventListener("click", deleteSong);

        function likeSong(e) {
            e.preventDefault();
            let likesArr = likesCounterElement.textContent.split(" ");
            likesArr[likesArr.length - 1]++;
            likesCounterElement.textContent = likesArr.join(" ");
            likeBtn.disabled = "disabled";
        }

        function saveSong(e) {
            e.preventDefault();
            saveBtn.remove();
            likeBtn.remove();
            savedSongsContainer.appendChild(divElement);
        }

        function deleteSong(e) {
            e.preventDefault();
            divElement.remove();
        }
    }

    // HELPERS
    function getInputValues() {
        return [genreElement.value, nameElement.value, authorElement.value, dateElement.value];
    }

    function clearInputValues() {
        genreElement.value = "";
        nameElement.value = "";
        authorElement.value = "";
        dateElement.value = "";
    }
}
