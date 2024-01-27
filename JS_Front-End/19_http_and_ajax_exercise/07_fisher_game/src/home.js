const homeView = document.getElementById("home-view");
const homeNavBtn = document.getElementById("home");

const guestButtonsDiv = document.getElementById("guest");
const userButtonsDiv = document.getElementById("user");

const userEmailElement = document.querySelector(".email span");

const catchContainer = document.getElementById("catches");

const catchUrl = "http://localhost:3030/data/catches/";
const loadBtn = document.querySelector("button[class='load");
const addBtn = document.querySelector("button[class='add");

const logoutUrl = "http://localhost:3030/users/logout";
const logoutBtn = document.getElementById("logout");

onload = (event) => {
    catchContainer.replaceChildren();
    let loggedUser = sessionStorage.getItem("userEmail") ? sessionStorage.getItem("userEmail") : "guest";
    if (loggedUser !== "guest") {
        userButtonsDiv.style.display = "";
        guestButtonsDiv.style.display = "none";
        addBtn.disabled = false;
    } else {
        userButtonsDiv.style.display = "none";
        guestButtonsDiv.style.display = "";
        addBtn.disabled = true;
        addBtn.parentNode.disabled = true;
    }
    userEmailElement.textContent = loggedUser;
};

homeNavBtn.addEventListener("click", () => {});

addBtn.addEventListener("click", addCatch);

loadBtn.addEventListener("click", loadCatch);

logoutBtn.addEventListener("click", userLogout);

async function userLogout(e) {
    e.preventDefault();
    try {
        const response = await fetch(logoutUrl, {
            method: "get",
            headers: {
                "X-Authorization": sessionStorage.userToken,
            },
        });

        if (!response.ok) throw Error(response.statusText);

        sessionStorage.removeItem("userEmail");
        sessionStorage.removeItem("userToken");
        sessionStorage.removeItem("userId");

        window.confirm("You are logged out...");
        location.reload();
    } catch (err) {
        window.confirm(err);
    }
}

async function loadCatch(e) {
    catchContainer.replaceChildren();
    const userId = sessionStorage.getItem("userId");
    // if (!userId) return;
    // console.log(userId);
    try {
        const response = await fetch(catchUrl, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const catchData = await response.json();
        Array.from(catchData).forEach((record) => {
            let catchRecord = document.createElement("div");
            catchRecord.innerHTML = `<div class="catch">
                <label>Angler</label>
                <input type="text" class="angler" value="${record.angler}">
                <label>Weight</label>
                <input type="text" class="weight" value="${Number(record.weight)}">
                <label>Species</label>
                <input type="text" class="species" value="${record.species}">
                <label>Location</label>
                <input type="text" class="location" value="${record.location}">
                <label>Bait</label>
                <input type="text" class="bait" value="${record.bait}">
                <label>Capture Time</label>
                <input type="number" class="captureTime" value="${Number(record.captureTime)}">
                <button class="update" data-id="${record._id}">Update</button>
                <button class="delete" data-id="${record._id}">Delete</button>
            </div>`;
            const isDisabled = record._ownerId !== userId;
            const formElements = Array.from(catchRecord.querySelectorAll("input, button"));
            formElements.forEach((element) => {
                element.disabled = isDisabled;
            });

            if (!isDisabled) {
                const [updateRecordBtn, deleteRecordBtn] = catchRecord.getElementsByTagName("button");

                deleteRecordBtn.addEventListener("click", async (e) => {
                    try {
                        await fetch(catchUrl + record._id, {
                            method: "delete",
                            headers: { "X-Authorization": sessionStorage.userToken },
                        });
                        if (!response.ok) throw Error(response.statusText);

                        loadCatch(e);
                    } catch (err) {
                        window.confirm(err);
                    }
                });

                updateRecordBtn.addEventListener("click", async (e) => {
                    const inputFields = catchRecord.getElementsByTagName("input");

                    const newRecord = {};
                    for (const inputField of inputFields) {
                        newRecord[inputField.classList[0]] = inputField.value;
                    }
                    try {
                        await fetch(catchUrl + record._id, {
                            method: "put",
                            headers: { "X-Authorization": sessionStorage.userToken },
                            body: JSON.stringify({
                                angler: inputFields[0].value,
                                weight: Number(inputFields[1].value),
                                species: inputFields[2].value,
                                location: inputFields[3].value,
                                bait: inputFields[4].value,
                                captureTime: Number(inputFields[5].value),
                                _id: record._id,
                            }),
                        });
                        if (!response.ok) throw Error(response.statusText);

                        catchContainer.replaceChildren();
                        loadCatch(e);
                    } catch (err) {
                        window.confirm(err);
                    }
                });
            }
            catchContainer.appendChild(catchRecord);
        });
        if (!response.ok) throw Error(response.statusText);
    } catch (err) {
        window.confirm(err);
    }
}

async function addCatch(e) {
    e.preventDefault();
    const addForm = document.getElementById("addForm");
    const data = new FormData(addForm);

    const newRecord = {};

    console.log(newRecord);
    try {
        for (const [key, value] of data) {
            if (!value) throw Error("Please, fill all fields!");
            newRecord[key] = value;
        }

        const response = await fetch(catchUrl, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "X-Authorization": sessionStorage.userToken,
            },
            body: JSON.stringify(newRecord),
        });

        if (!response.ok) throw Error(response.statusText);

        catchContainer.replaceChildren();
        loadCatch(e);
        addForm.reset();
    } catch (err) {
        window.confirm(err);
    }
}
