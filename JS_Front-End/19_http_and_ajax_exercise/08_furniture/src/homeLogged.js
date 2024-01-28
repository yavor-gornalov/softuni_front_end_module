const logoutUrl = "http://localhost:3030/users/logout"
const logoutBtn = document.getElementById("logoutBtn")
logoutBtn.addEventListener("click", async (e) => {
    e.preventDefault()
    try {
        const response = await fetch(logoutUrl, {
            method: "get",
            headers: {
                "X-Authorization": sessionStorage.accessToken,
            },
        });

        if (!response.ok) throw Error(response.statusText);

        sessionStorage.removeItem("accessToken");

        window.confirm("Logging out...");
        location.reload();
    } catch (err) {
        window.confirm(err);
    }
})