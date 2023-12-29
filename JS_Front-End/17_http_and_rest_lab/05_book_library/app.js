function attachEvents() {
    const baseUrl = "http://localhost:3030/jsonstore/collections/books/";
    const loadButton = document.getElementById("loadBooks");
    const formTitle = document.querySelector("#form h3");
    const formSubmitButton = document.querySelector("#form button");
    const bookList = document.getElementById("bookList");
    const titleField = document.querySelector("#form input[name='title']");
    const authorField = document.querySelector("#form input[name='author']");

    loadButton.addEventListener("click", (e) => {
        fetch(baseUrl)
            .then((response) => response.json())
            .then((data) => renderData(data))
            .catch((err) => console.log(err));
    });

    formSubmitButton.addEventListener("click", (e) => {
        const title = titleField.value;
        const author = authorField.value;

        if (!title || !author) {
            return;
        }
        if (formSubmitButton.textContent === "Submit") {
            fetch(baseUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title,
                    author,
                }),
            })
                .then((res) => res.json())
                .then((res) => appendRecord(res._id, res.title, res.author))
                .catch((err) => console.log(err));
        } else {
            const book_id = formSubmitButton.id;
            formSubmitButton.removeAttribute("id");
            const currentRow = document.getElementById(book_id);

            fetch(baseUrl + book_id, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title,
                    author,
                }),
            })
                .then(() => {
                    currentRow.children[0].textContent = title;
                    currentRow.children[1].textContent = author;
                })
                .catch((err) => console.log(err));

            formSubmitButton.textContent = "Submit";
            formTitle.textContent = "FORM";
        }
        titleField.value = "";
        authorField.value = "";
    });

    function renderData(data) {
        bookList.innerHTML = "";
        for (const [book_id, record] of Object.entries(data)) {
            appendRecord(book_id, record.title, record.author);
        }
    }

    function appendRecord(book_id, title, author) {
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        const bookActions = document.createElement("td");
        bookActions.appendChild(editButton);
        bookActions.appendChild(deleteButton);

        const bookTitle = document.createElement("td");
        bookTitle.textContent = title;

        const bookAuthor = document.createElement("td");
        bookAuthor.textContent = author;

        const tableRow = document.createElement("tr");
        tableRow.id = book_id;
        tableRow.appendChild(bookTitle);
        tableRow.appendChild(bookAuthor);
        tableRow.appendChild(bookActions);

        bookList.appendChild(tableRow);

        deleteButton.addEventListener("click", (e) => {
            fetch(baseUrl + book_id, { method: "DELETE" })
                .then(() => {
                    bookList.removeChild(tableRow);
                })
                .catch((err) => {
                    bookList.appendChild(tableRow);
                    console.log(err);
                });
        });

        editButton.addEventListener("click", (e) => {
            formTitle.textContent = "Edit FORM";
            formSubmitButton.textContent = "Save";

            titleField.value = bookTitle.textContent;
            authorField.value = bookAuthor.textContent;

            formSubmitButton.id = book_id;
        });
    }
}
attachEvents();
