const loginUrl = "http://localhost:3030/users/login";
const logoutUrl = "http://localhost:3030/users/logout";
const registerUrl = "http://localhost:3030/users/register";

const registerView = document.getElementById("register-view");
const registrationForm = document.querySelector("form[id='register']");
const submitRegistrationBtn = document.querySelector("form[id='register'] button");

const loginView = document.getElementById("login-view");
const homeView = document.getElementById("home-view");

const loginBtn = document.getElementById("login");
const logoutBtn = document.getElementById("logout");
const registerBtn = document.getElementById("register");
const homeBtn = document.getElementById("home");

const userEmailElement = document.querySelector(".email span");

loginBtn.addEventListener("click", userLogin);
logoutBtn.addEventListener("click", userLogout);
registerBtn.addEventListener("click", userRegistration);

if (sessionStorage.getItem("userToken")) {
    let loggedUser = sessionStorage.getItem("userEmail");
    let userToken = sessionStorage.getItem("userEmail");

    homeView.style.display = "";
    loginView.style.display = "none";
    registerView.style.display = "none";

    loginBtn.style.display = "none";
    registerBtn.style.display = "none";
    logoutBtn.style.display = "";

    userEmailElement.textContent = loggedUser;
} else {
    homeView.style.display = "";
    loginView.style.display = "none";
    registerView.style.display = "none";

    loginBtn.style.display = "";
    registerBtn.style.display = "";
    logoutBtn.style.display = "none";
}

function changeView(view) {
    switch (view) {
        case "registerView":
            homeView.style.display = "none";
            loginView.style.display = "none";
            registerView.style.display = "";

            registerBtn.classList.add("active");
            homeBtn.classList.remove("active");
            loginBtn.classList.remove("active");
            loginBtn.classList.remove("active");
            break;
    
        default:
            break;
    }
}

async function userRegistration() {
    try {
        registerBtn.classList.add("active");
        homeBtn.classList.remove("active");
        loginBtn.classList.remove("active");
        loginBtn.classList.remove("active");

        homeView.style.display = "none";
        loginView.style.display = "none";
        registerView.style.display = "";

        const formData = new FormData(registrationForm);
        console.log(registrationForm);
        console.log(submitRegistrationBtn);

        // const response = await fetch(registerUrl, {
        //     method: "post",
        //     headers: {
        //         "Content-type": "application/json",
        //     },
        //     body: JSON.stringify({
        //         email: "new_user@abv.bg",
        //         password: "123456",
        //     }),
        // });
        // const data = await response.json();
        console.log(data);
    } catch (err) {
        console.log(err);
    }
}

async function userLogin() {
    try {
        const response = await fetch(loginUrl, {
            method: "post",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                email: "new_user@abv.bg",
                password: "123456",
            }),
        });
        const user = await response.json();
        sessionStorage.setItem("userEmail", user.email);
        sessionStorage.setItem("userToken", user.accessToken);
    } catch (err) {
        console.log(err);
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
        sessionStorage.removeItem("userEmail");
        sessionStorage.removeItem("userToken");
    } catch (err) {
        console.log(err);
    }
}

// userRegistration();
// userLogin();
// userLogout();
