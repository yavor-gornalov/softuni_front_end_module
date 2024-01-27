const registerUrl = "http://localhost:3030/users/register";
const registerNavBtn = document.getElementById("register");
const registerView = document.getElementById("register-view");
const registrationForm = document.querySelector("form#register");
const registrationSubmitBtn = document.querySelector("form#register button");

registrationSubmitBtn.addEventListener("click", userRegistration);

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

async function userRegistration(e) {
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

        location.replace("./home.html");
    } catch (err) {
        registrationForm.reset();
        window.confirm(err);
    }
}
