const registerUrl = "http://localhost:3030/users/register";
const registerNavBtn = document.getElementById("register");
const registerView = document.getElementById("register-view");
const registrationForm = document.querySelector("form[id='register']");
const registrationSubmitBtn = document.querySelector("form[id='register'] button");

const loginUrl = "http://localhost:3030/users/login";
const loginNavBtn = document.getElementById("login");
const loginView = document.getElementById("login-view");
const loginForm = document.querySelector("form[id='login']");
const loginSubmitBtn = document.querySelector("form[id='login'] button");

const logoutUrl = "http://localhost:3030/users/logout";
const logoutBtn = document.getElementById("logout");

const homeView = document.getElementById("home-view");
const homeNavBtn = document.getElementById("home");

const guestButtonsDiv = document.getElementById("guest");
const userButtonsDiv = document.getElementById("user");

const userEmailElement = document.querySelector(".email span");

const fieldsetMain = document.getElementById("main");

const catchUrl = "http://localhost:3030/data/catches/";
const loadBtn = document.querySelector("button[class='load");
const addBtn = document.querySelector("button[class='add");

homeNavBtn.addEventListener("click", () => changeView("homeView"));
registerNavBtn.addEventListener("click", () => changeView("registerView"));
loginNavBtn.addEventListener("click", () => changeView("loginView"));
logoutBtn.addEventListener("click", userLogout);

registrationSubmitBtn.addEventListener("click", userRegistration);
loginSubmitBtn.addEventListener("click", userLogin);

addBtn.addEventListener("click", addCatch);

loadBtn.addEventListener("click", loadCatch);

changeView("loginView");

async function userRegistration(e) {
    e.preventDefault();
    const formData = new FormData(registrationForm);
    const email = formData.get("email");
    const password = formData.get("password");
    const rePass = formData.get("rePass");

    if (password !== rePass) return window.confirm("Passwords do not match!");

    try {
        const response = await fetch(registerUrl, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });

        if (!response.ok) throw Error(response.statusText);

        changeView("homeView");
    } catch (err) {
        registrationForm.reset()
        window.confirm(err);
    }
}

async function userLogin(e) {
    e.preventDefault();
    const formData = new FormData(loginForm);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
        const response = await fetch(loginUrl, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });

        if (!response.ok) throw Error(response.statusText);

        const user = await response.json();
        console.log(user);
        sessionStorage.setItem("userEmail", user.email);
        sessionStorage.setItem("userToken", user.accessToken);
        sessionStorage.setItem("userId", user._id);

        changeView("homeView");
    } catch (err) {
        loginForm.reset()
        window.confirm(err);
        // console.log(loginForm.inputField)
    }
}

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

        changeView("homeView");
    } catch (err) {
        window.confirm(err);
    }
}

async function loadCatch(e) {
    e.preventDefault();
    const userId = sessionStorage.getItem("userId");
    if (!userId) return;
    console.log(userId);
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
            // catchRecord.classList.add("catch");
            catchRecord.innerHTML = `<div class="catch">
                <label>Angler</label>
                <input type="text" class="angler" value="${record.angler}">
                <label>Weight</label>
                <input type="text" class="weight" value="${record.weight}">
                <label>Species</label>
                <input type="text" class="species" value="${record.species}">
                <label>Location</label>
                <input type="text" class="location" value="${record.location}">
                <label>Bait</label>
                <input type="text" class="bait" value="${record.bait}">
                <label>Capture Time</label>
                <input type="number" class="captureTime" value="${record.captureTime}">
                <button class="update" data-id="${record._id}">Update</button>
                <button class="delete" data-id="${record._id}">Delete</button>
            </div>`;
            const [updateRecordBtn, deleteRecordBtn] = catchRecord.getElementsByTagName("button");
            updateRecordBtn.disabled = record._ownerId !== userId;
            deleteRecordBtn.disabled = record._ownerId !== userId;

            deleteRecordBtn.addEventListener("click", async (e) => {
                try {
                    await fetch(catchUrl + record._id, {
                        method: "delete",
                        headers: { "X-Authorization": sessionStorage.userToken },
                    });
                    if (!response.ok) throw Error(response.statusText);

                    fieldsetMain.replaceChildren();
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
                        body: JSON.stringify(newRecord),
                    });
                    if (!response.ok) throw Error(response.statusText);

                    fieldsetMain.replaceChildren();
                    loadCatch(e);
                } catch (err) {
                    window.confirm(err);
                }
            });

            fieldsetMain.appendChild(catchRecord);
        });
        fieldsetMain.style.display = "";
        console.log(catchData);
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

        fieldsetMain.replaceChildren();
        loadCatch(e);
    } catch (err) {
        window.confirm(err);
    }
}

function changeView(view) {
    fieldsetMain.style.display = "none";
    fieldsetMain.replaceChildren()
    let loggedUser = sessionStorage.getItem("userEmail") ? sessionStorage.getItem("userEmail") : "guest";
    if (loggedUser !== "guest") {
        userButtonsDiv.style.display = "";
        guestButtonsDiv.style.display = "none";
        addBtn.disabled = false;
    } else {
        userButtonsDiv.style.display = "none";
        guestButtonsDiv.style.display = "";
        addBtn.disabled = true;
    }

    userEmailElement.textContent = loggedUser;

    switch (view) {
        case "registerView":
            homeView.style.display = "none";
            loginView.style.display = "none";
            registerView.style.display = "";

            registerNavBtn.classList.add("active");
            homeNavBtn.classList.remove("active");
            loginNavBtn.classList.remove("active");
            logoutBtn.classList.remove("active");
            break;

        case "loginView":
            homeView.style.display = "none";
            loginView.style.display = "";
            registerView.style.display = "none";

            registerNavBtn.classList.remove("active");
            homeNavBtn.classList.remove("active");
            loginNavBtn.classList.add("active");
            logoutBtn.classList.remove("active");
            break;

        case "homeView":
            homeView.style.display = "";
            loginView.style.display = "none";
            registerView.style.display = "none";

            registerNavBtn.classList.remove("active");
            homeNavBtn.classList.add("add");
            loginNavBtn.classList.remove("active");
            logoutBtn.classList.remove("active");
            break;

        default:
            break;
    }
}
