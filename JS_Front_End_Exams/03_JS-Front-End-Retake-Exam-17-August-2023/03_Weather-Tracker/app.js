const baseUrl = "http://localhost:3030/jsonstore/tasks/";

const historyContainer = document.getElementById("list");
const locationInputElement = document.getElementById("location");
const temperatureInputElement = document.getElementById("temperature");
const dateInputElement = document.getElementById("date");

const historyBtn = document.getElementById("load-history");
historyBtn.addEventListener("click", fetchHistory);

const addWeatherButton = document.getElementById("add-weather");
addWeatherButton.addEventListener("click", addWeather);

const editWeatherButton = document.getElementById("edit-weather");
editWeatherButton.addEventListener("click", putRecord);

async function addWeather(e) {
    e.preventDefault();

    const location = locationInputElement.value;
    const temperature = temperatureInputElement.value;
    const date = dateInputElement.value;

    if (!location || !temperature || !date) {
        return;
    }

    const newRecord = {
        location,
        temperature,
        date,
    };

    try {
        await fetch(baseUrl, {
            method: "post",
            // headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newRecord),
        });
        clearInputFields();
        await fetchHistory(e);
    } catch (error) {
        console.log(error);
    }
}

async function fetchHistory(e) {
    e.preventDefault();
    historyContainer.replaceChildren();

    try {
        const response = await fetch(baseUrl);
        const data = await response.json();
        console.log(data);

        for (const [_id, record] of Object.entries(data)) {
            createRecordContainer(record);
        }
    } catch (error) {
        console.log(error);
    }
}

function createRecordContainer(record) {
    const containerElement = document.createElement("div");
    containerElement.classList.add("container");
    containerElement.id = record._id;

    const locationElement = document.createElement("h2");
    locationElement.textContent = record.location;

    const dateElement = document.createElement("h3");
    dateElement.textContent = record.date;

    const degreesElement = document.createElement("h3");
    degreesElement.id = "celsius";
    degreesElement.textContent = record.temperature;

    const buttonsContainer = document.createElement("div");
    buttonsContainer.classList.add("buttons-container");

    const changeBtn = document.createElement("button");
    changeBtn.classList.add("change-btn");
    changeBtn.textContent = "Change";
    changeBtn.addEventListener("click", changeRecord);

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", deleteRecord);

    buttonsContainer.appendChild(changeBtn);
    buttonsContainer.appendChild(deleteBtn);

    containerElement.appendChild(locationElement);
    containerElement.appendChild(dateElement);
    containerElement.appendChild(degreesElement);
    containerElement.appendChild(buttonsContainer);

    historyContainer.appendChild(containerElement);
}

async function changeRecord(e) {
    e.preventDefault;
    const containerElement = e.target.closest("div.container");
    const recordId = containerElement.id;
    addWeatherButton.disabled = true;

    locationInputElement.value =
        containerElement.querySelectorAll("h2")[0].textContent;
    temperatureInputElement.value =
        containerElement.querySelectorAll("h3")[1].textContent;
    dateInputElement.value =
        containerElement.querySelectorAll("h3")[0].textContent;

    containerElement.remove();
    editWeatherButton.disabled = false;
    editWeatherButton.dataset.id = recordId;
}

async function deleteRecord(e) {
    e.preventDefault;
    recordId = e.target.closest("div.container").id;

    try {
        await fetch(baseUrl + recordId, { method: "delete" });
        console.log("Deleted!");
        await fetchHistory(e);
    } catch (error) {
        console.log(error);
    }
}

function clearInputFields() {
    locationInputElement.value = "";
    temperatureInputElement.value = "";
    dateInputElement.value = "";
}

async function putRecord(e) {
    const recordId = e.target.dataset.id;
    const location = locationInputElement.value;
    const temperature = temperatureInputElement.value;
    const date = dateInputElement.value;

    if (!location || !temperature || !date) {
        return;
    }

    const editedRecord = {
        location,
        temperature,
        date,
    };

    try {
        await fetch(baseUrl + recordId, {
            method: "put",
            // headers: { "Content-Type": "application/json" },
            body: JSON.stringify(editedRecord),
        });
        await fetchHistory(e);
        clearInputFields();
        addWeatherButton.disabled = false;
        editWeatherButton.disabled = true;
    } catch (error) {
        console.log(error);
    }
}
