const registrationUrl = "http://localhost:3030/users/register";
const createForm = document.querySelector("form[id='register-form']");
const registerBtn = createForm.querySelector("button");

const loginUrl = "http://localhost:3030/users/login";
const loginForm = document.querySelector("form[id='login-form']");
const loginBtn = loginForm.querySelector("button");

registerBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const registrationData = new FormData(createForm);
    const email = registrationData.get("email");
    const password = registrationData.get("password");
    const rePass = registrationData.get("rePass");
    createForm.reset();

    if (!email || !password) return window.confirm("Fields Email and Password are required!");
    if (password !== rePass) return window.confirm("Passwords do not match!");

    try {
        const response = await fetch(registrationUrl, {
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
        window.confirm(`User '${email}', was registered successfully!`);
        // location.replace("./home.html");
    } catch (err) {
        window.confirm(err);
    }
});

loginBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const loginData = new FormData(loginForm);
    const email = loginData.get("email");
    const password = loginData.get("password");

    if (!email || !password) return window.confirm("Fields Email and Password are required!");
    
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

        const user = await response.json();

        if (!response.ok) throw Error(response.statusText);

        sessionStorage.setItem("accessToken", user.accessToken);
        sessionStorage.setItem("userId", user._id);
        window.alert(`User '${email}', just logged in!\nRedirecting to Home page.`);
        location.replace("./homeLogged.html")

    } catch (err) {
        window.confirm(err);
    }
});
