window.addEventListener("load", solveHome);
function solveHome() {
    const userInfoObj = JSON.parse(localStorage.getItem("userInfo"));
    const btnLoad = document.querySelector(".load");

    document.querySelector("#catches").replaceChildren();

    btnLoad.addEventListener("click", async () => {
        const responseLoad = await fetch("http://localhost:3030/data/catches");
        const answerLoad = await responseLoad.json();

        const catchesArr = [];

        for (let catchObj of answerLoad) {
            const divCatch = document.createElement("div");
            divCatch.classList.add("catch");
            catchesArr.push(divCatch);

            function addLabel(labelStr) {
                const label = document.createElement("label");
                label.textContent = labelStr;
                divCatch.appendChild(label);
            }
            let isDisabled = true;
            if (userInfoObj && catchObj._ownerId === userInfoObj._id) {
                isDisabled = false;
            }
            function createInput(classStr, valueStr) {
                const inputEl = document.createElement("input");
                inputEl.type = "text";
                inputEl.classList.add(classStr);
                inputEl.value = valueStr;
                inputEl.disabled = isDisabled;
                divCatch.appendChild(inputEl);
                return inputEl;
            }
            addLabel("Angler");
            const inputAngler = createInput("angler", catchObj.angler);
            addLabel("Weight");
            const inputWeight = createInput("weight", catchObj.weight);
            addLabel("Species");
            const inputSpecies = createInput("species", catchObj.species);
            addLabel("Location");
            const inputLocation = createInput("location", catchObj.location);
            addLabel("Bait");
            const inputBait = createInput("bait", catchObj.bait);
            addLabel("Capture Time");
            const inputTime = createInput("captureTime", catchObj.captureTime);

            const btnUpdate = document.createElement("button");
            btnUpdate.classList.add("update");
            btnUpdate.textContent = "Update";
            btnUpdate.disabled = isDisabled;
            divCatch.appendChild(btnUpdate);

            const btnDelete = document.createElement("button");
            btnDelete.classList.add("delete");
            btnDelete.textContent = "Delete";
            btnDelete.disabled = isDisabled;
            divCatch.appendChild(btnDelete);
            if (isDisabled) {
                continue;
            }
            btnUpdate.addEventListener("click", async () => {
                await fetch("http://localhost:3030/data/catches/" + catchObj._id, {
                    method: "PUT",
                    headers: { "X-Authorization": userInfoObj.accessToken },
                    body: JSON.stringify({
                        angler: inputAngler.value,
                        bait: inputBait.value,
                        captureTime: inputTime.value,
                        location: inputLocation.value,
                        species: inputSpecies.value,
                        weight: inputWeight.value,
                        _id: catchObj._id,
                    }),
                });
                btnLoad.click();
            });
            btnDelete.addEventListener("click", async () => {
                await fetch("http://localhost:3030/data/catches/" + catchObj._id, {
                    method: "DELETE",
                    headers: { "X-Authorization": userInfoObj.accessToken },
                });
                btnLoad.click();
            });
        }
        document.querySelector("#catches").replaceChildren(...catchesArr); //must use intead of innerHTML = '' because tests fail
    });
    if (userInfoObj === null) {
        document.querySelector("#user").style.display = "none";
    } else {
        document.querySelector("#guest").style.display = "none";
        document.querySelector("span").textContent = userInfoObj.email;
        document.querySelector(".add").disabled = false;
        btnLoad.click(); //must load when logging in, not later with load button because the tests don't wait it
    }
    document.querySelector("#logout").addEventListener("click", async () => {
        await fetch("http://localhost:3030/users/logout", { headers: { "X-Authorization": userInfoObj.accessToken } });
        localStorage.removeItem("userInfo");
        window.location.replace("index.html"); //refresh
    });
    document.querySelector(".add").addEventListener("click", async (event) => {
        event.preventDefault();
        const [angler, weight, species, location, bait, captureTime] = [
            ...document.querySelectorAll("#addForm input"),
        ].map((el) => el.value);

        await fetch("http://localhost:3030/data/catches", {
            method: "POST",
            headers: { "X-Authorization": userInfoObj.accessToken },
            body: JSON.stringify({ angler, weight, species, location, bait, captureTime }),
        });
        btnLoad.click();
    });
}
