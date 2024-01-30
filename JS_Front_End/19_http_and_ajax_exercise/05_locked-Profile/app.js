async function lockedProfile() {
    const baseUrl = "http://localhost:3030/jsonstore/advanced/profiles";

    async function getUserData() {
        try {
            const response = await fetch(baseUrl, { method: "get" });
            return await response.json();
        } catch (error) {
            return error;
        }
    }

    const userData = await getUserData();
    const mainElement = document.getElementById("main");

    Object.values(userData).forEach((user) => {
        const userCard = document.createElement("div");
        userCard.id = user._id;
        userCard.classList.add("profile");
        userCard.innerHTML = `<img src="./iconProfile2.png" class="userIcon" />
        <label>Lock</label>
        <input type="radio" name="${user.username}Locked" value="lock" checked>
        <label>Unlock</label>
        <input type="radio" name="${user.username}Locked" value="unlock"><br>
        <hr>
        <label>Username</label>
        <input type="text" name="user1Username" value="${user.username}" disabled readonly />
        <div class="more-info" hidden>
            <hr>
            <label>Email:</label>
            <input type="email" name="user1Email" value="${user.email}" disabled readonly />
            <label>Age:</label>
            <input type="email" name="user1Age" value="31" disabled readonly />
        </div>
		<button>Show more</button>`;

        const btnShow = userCard.getElementsByTagName("button")[0];
        const [btnLock, btnUnlock] = userCard.querySelectorAll("input[type='radio']");
        const moreInfoElement = userCard.querySelector("div[class='more-info']");

        btnShow.addEventListener("click", () => {
            if (btnLock.checked) return;
            if (btnUnlock.checked) {
                if (btnShow.textContent === "Show more") {
                    moreInfoElement.hidden = false;
                    btnShow.textContent = "Hide it";
                } else {
                    btnShow.textContent = "Show more";
                    moreInfoElement.hidden = true;
                }
            }
        });

        mainElement.appendChild(userCard);
    });

    // const userCard = document.querySelector("div[class='profile']");
    // document.querySelector("div[class='profile']").remove()

    // const mainElement = document.getElementById("main");
    // Object.values(userData).forEach((user) => {
    //     console.log(user)
    //     let userElement = userCard.cloneNode(true);
    //     userElement.id = user._id
    //     mainElement.appendChild(userElement);
    // });
}
