const loginUrl = "http://localhost:3030/users/login";
const loginNavBtn = document.getElementById("login");
const loginView = document.getElementById("login-view");
const loginForm = document.querySelector("form#login");
const loginSubmitBtn = document.querySelector("form#login button");

loginSubmitBtn.addEventListener("click", userLogin);

onload = (event) => {
    console.log("it works!");
    const guestButtonsDiv = document.getElementById("guest");
    const userButtonsDiv = document.getElementById("user");
    const userEmailElement = document.querySelector(".email span");
    let loggedUser = sessionStorage.getItem("userEmail") ? sessionStorage.getItem("userEmail") : "guest";
    if (loggedUser !== "guest") {
        userButtonsDiv.style.display = "";
        guestButtonsDiv.style.display = "none";
        // addBtn.disabled = false;
    } else {
        userButtonsDiv.style.display = "none";
        guestButtonsDiv.style.display = "";
        // addBtn.disabled = true;
    }
    userEmailElement.textContent = loggedUser;
};

async function userLogin(e) {
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

        location.replace("./home.html");
    } catch (err) {
        loginForm.reset();
        window.confirm(err);
    }
}
