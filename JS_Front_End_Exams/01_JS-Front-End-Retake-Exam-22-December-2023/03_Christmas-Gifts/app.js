const presentsUrl = "http://localhost:3030/jsonstore/gifts/";

const presentsContainer = document.querySelector("#gift-list");
const presentForm = document.querySelector("#form form");
const presentNameField = document.querySelector("#form #gift");
const presentReceiverField = document.querySelector("#form #for");
const presentPriceField = document.querySelector("#form #price");

const editBtn = document.querySelector("#edit-present");
const addBtn = document.querySelector("#add-present");

addBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const formData = new FormData(presentForm);
    const newPresent = {};
    for (const [key, value] of formData) {
        if (!value) throw Error("Empty fields are not allowed!");
        newPresent[key] = value;
    }

    try {
        const response = await fetch(presentsUrl, {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newPresent),
        });
    } catch (err) {
        console.log(err);
    }
    loadPresentBtn.click();
    presentForm.reset();
});

const loadPresentBtn = document.querySelector("#load-presents");
loadPresentBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    console.log("loading presents...");
    presentsContainer.replaceChildren();
    try {
        const response = await fetch(presentsUrl, {
            method: "get",
            headers: { "Content-Type": "application/json" },
        });
        const presentsData = await response.json();

        for (const present of Object.values(presentsData)) {
            const [name, receiver, price, presentId] = Object.values(present);
            const newPresent = document.createElement("div");
            newPresent.classList.add("gift-sock");
            newPresent.id = presentId;

            const presentContent = document.createElement("div");
            presentContent.classList.add("content");

            const presentName = document.createElement("p");
            presentName.textContent = name;
            presentContent.appendChild(presentName);

            const presentReceiver = document.createElement("p");
            presentReceiver.textContent = receiver;
            presentContent.appendChild(presentReceiver);

            const presentPrice = document.createElement("p");
            presentPrice.textContent = price;
            presentContent.appendChild(presentPrice);

            newPresent.appendChild(presentContent);

            const presentButtons = document.createElement("div");
            presentButtons.classList.add("buttons-container");

            const changeBtn = document.createElement("button");
            changeBtn.classList.add("change-btn");
            changeBtn.textContent = "Change";
            presentButtons.appendChild(changeBtn);

            const deleteBtn = document.createElement("button");
            deleteBtn.classList.add("delete-btn");
            deleteBtn.textContent = "Delete";
            presentButtons.appendChild(deleteBtn);

            newPresent.appendChild(presentButtons);

            presentsContainer.appendChild(newPresent);
        }
    } catch (err) {
        console.log(err);
    }



    const changeButtons = document.querySelectorAll(".change-btn")
    Array.from(changeButtons).forEach((changeBtn) => {
        changeBtn.addEventListener("click", editPresent)
    })

    async function editPresent(e) {
        e.preventDefault();
        addBtn.disabled = true;
        editBtn.disabled = false;
        const currentPresent = e.currentTarget.parentNode.parentNode;
        currentPresent.style.display = "none";
        presentForm.querySelector("#gift").value = currentPresent.querySelector("p:nth-child(1)").textContent;
        presentForm.querySelector("#for").value = currentPresent.querySelector("p:nth-child(2)").textContent;
        presentForm.querySelector("#price").value = currentPresent.querySelector("p:nth-child(3)").textContent;

        editBtn.addEventListener("click", async (e) => {
            e.preventDefault();
            const formData = new FormData(presentForm);
            const presentId = currentPresent.id;
            for (const [key, value] of formData) {
                if (!value) throw Error("Empty fields are not allowed!");
                currentPresent[key] = value;
            }
            try {
                await fetch(presentsUrl + presentId, {
                    method: "put",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(currentPresent),
                });
                currentPresent.querySelector("p:nth-child(1)").textContent = presentForm.querySelector("#gift").value;
                currentPresent.querySelector("p:nth-child(2)").textContent = presentForm.querySelector("#for").value;
                currentPresent.querySelector("p:nth-child(3)").textContent = presentForm.querySelector("#price").value;
                currentPresent.style.display = "";
                addBtn.disabled = false;
                editBtn.disabled = true;
                presentForm.reset();
            } catch (err) {
                console.log(err);
            }
        });
    }

    const deleteButtons = document.querySelectorAll(".delete-btn");
    Array.from(deleteButtons).forEach((deleteBtn) => {
        deleteBtn.addEventListener("click", deletePresent);
    });

    async function deletePresent(e) {
        e.preventDefault();
        try {
            const currentPresent = await e.currentTarget.parentNode.parentNode;
            await fetch(presentsUrl + currentPresent.id, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            });
            currentPresent.remove();
        } catch (err) {
            console.log(err);
        }
    }
});
