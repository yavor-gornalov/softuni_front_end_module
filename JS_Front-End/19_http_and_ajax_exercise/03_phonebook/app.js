function attachEvents() {
    const baseUrl = "http://localhost:3030/jsonstore/phonebook/";
    const phonebookList = document.getElementById("phonebook");
    const inputPerson = document.getElementById("person");
    const inputPhone = document.getElementById("phone");
    const btnLoad = document.getElementById("btnLoad");
    const btnCreate = document.getElementById("btnCreate");

    btnLoad.addEventListener("click", async () => {
        phonebookList.replaceChildren();
        try {
            const response = await fetch(baseUrl, { method: "get" });
            const personPhones = Object.values(await response.json());
            personPhones.forEach((el) => {
                const newListItem = document.createElement("li");
                newListItem.textContent = `${el.person}: ${el.phone}`;

                const btnDelete = document.createElement("button");
                btnDelete.textContent = "Delete";
                btnDelete.addEventListener("click", async () => {
                    try {
                        await fetch(baseUrl + el._id, { method: "delete" });
                        newListItem.remove()
                    } catch (err) {
                        console.log(err);
                    }
                });

                newListItem.appendChild(btnDelete);
                phonebookList.appendChild(newListItem);
            });
        } catch (error) {
            console.log(error);
        }
    });
    btnCreate.addEventListener("click", async () => {
        const person = inputPerson.value;
        const phone = inputPhone.value;

        if (!person || !phone) return;

        const newRecord = JSON.stringify({
            person,
            phone,
        });
        try {
            await fetch(baseUrl, { method: "post", body: newRecord });
        } catch (err) {
            console.log(err);
        } finally {
            inputPerson.value = "";
            inputPhone.value = "";
        }
    });
}

attachEvents();
