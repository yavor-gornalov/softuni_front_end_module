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

homeNavBtn.addEventListener("click", () => changeView("homeView"));
registerNavBtn.addEventListener("click", () => changeView("registerView"));
loginNavBtn.addEventListener("click", () => changeView("loginView"));
logoutBtn.addEventListener("click", userLogout);

registrationSubmitBtn.addEventListener("click", userRegistration);
loginSubmitBtn.addEventListener("click", userLogin);

changeView("homeView");

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
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });

        if (!response.ok) throw Error(response.statusText);

        changeView("homeView");
    } catch (err) {
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
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });

        if (!response.ok) throw Error(response.statusText);

        const user = await response.json();
        sessionStorage.setItem("userEmail", user.email);
        sessionStorage.setItem("userToken", user.accessToken);

        changeView("homeView");
    } catch (err) {
        window.confirm(err);
    }
}

async function userLogout() {
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

        changeView("homeView");
    } catch (err) {
        window.confirm(err);
    }
}

function changeView(view) {
    let loggedUser = sessionStorage.getItem("userEmail") ? sessionStorage.getItem("userEmail") : "guest";
    console.log(loggedUser);
    if (loggedUser !== "guest") {
        userButtonsDiv.style.display = "";
        guestButtonsDiv.style.display = "none";
    } else {
        userButtonsDiv.style.display = "none";
        guestButtonsDiv.style.display = "";
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

// userRegistration();
// userLogin();
// userLogout();
