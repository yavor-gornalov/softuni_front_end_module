const baseURL = "http://localhost:3030/jsonstore/tasks/";

const loadVacationsBtn = document.getElementById("load-vacations");
const addVacationBtn = document.getElementById("add-vacation");
const editVacationBtn = document.getElementById("edit-vacation");

const vacationsContainer = document.getElementById("list");
const nameElement = document.getElementById("name");
const dateElement = document.getElementById("from-date");
const daysElement = document.getElementById("num-days");

loadVacationsBtn.addEventListener("click", FetchVacations);
addVacationBtn.addEventListener("click", AddVaction);
editVacationBtn.addEventListener("click", EditVacation);

async function FetchVacations(e) {
    e.preventDefault(e);
    try {
        const response = await fetch(baseURL, { method: "get" });
        const data = await response.json();
        LoadVacationData(data);

        AddEventListeners();
    } catch (error) {
        console.log(error);
    }
}

async function AddVaction(e) {
    e.preventDefault();
    const [name, date, days] = GetInputElements();
    if ((!name, !date, !days)) {
        return;
    }
    const newRecord = { name, date, days };
    try {
        await fetch(baseURL, {
            method: "post",
            body: JSON.stringify(newRecord),
        });

        // Important! Clear input fields before loading data,
        // to pass test 02 - for adding element
        ClearInputElements();

        await FetchVacations(e);
    } catch (error) {
        console.log(error);
    }
}

async function EditVacation(e) {
    e.preventDefault();
    const recordId = e.currentTarget.dataset.recordId;
    const [name, date, days] = GetInputElements();
    if ((!name, !date, !days)) {
        return;
    }
    const editedRecord = { name, date, days, _id: recordId };

    try {
        await fetch(baseURL + recordId, {
            method: "put",
            body: JSON.stringify(editedRecord),
        });

        ClearInputElements();
        DisableEditVacation();
        await FetchVacations(e);
    } catch (error) {
        console.log(error);
    }
}

function LoadVacationData(data) {
    vacationsContainer.replaceChildren();
    Object.values(data).forEach((record) => {
        CreateVacationElement(record);
        console.log(record);
    });
}

function AddEventListeners() {
    const changeBtns = document.getElementsByClassName("change-btn");
    const doneBtns = document.getElementsByClassName("done-btn");

    Array.from(changeBtns).forEach((changeBtn) => {
        changeBtn.addEventListener("click", ChangeVacation);
    });

    Array.from(doneBtns).forEach((doneBtn) => {
        doneBtn.addEventListener("click", DeleteVacation);
    });
}

function ChangeVacation(e) {
    e.preventDefault();
    const vacationElement = e.currentTarget.closest("div.container");
    const recordId = vacationElement.id;

    nameElement.value = vacationElement.querySelector("h2").textContent;
    daysElement.value = vacationElement.querySelector("h3:first-of-type").textContent;
    dateElement.value = vacationElement.querySelector("h3:last-of-type").textContent;

    editVacationBtn.dataset.recordId = recordId;
    EnableEditVacation();
}

async function DeleteVacation(e) {
    e.preventDefault();
    const vacationElement = e.currentTarget.closest("div.container");
    const recordId = vacationElement.id;

    try {
        await fetch(baseURL + recordId, { method: "delete" });
        await FetchVacations(e);
    } catch (error) {
        console.log(error);
    }
}

// HELPERS
function CreateVacationElement(record) {
    const containerElement = document.createElement("div");
    containerElement.classList.add("container");
    containerElement.id = record._id;

    const nameElement = document.createElement("h2");
    nameElement.textContent = record.name;

    const daysElement = document.createElement("h3");
    daysElement.textContent = record.date;

    const dateElement = document.createElement("h3");
    dateElement.textContent = record.days;

    const changeBtn = document.createElement("button");
    changeBtn.classList.add("change-btn");
    changeBtn.textContent = "Change";

    const doneBtn = document.createElement("button");
    doneBtn.classList.add("done-btn");
    doneBtn.textContent = "Done";

    containerElement.appendChild(nameElement);
    containerElement.appendChild(dateElement);
    containerElement.appendChild(daysElement);
    containerElement.appendChild(changeBtn);
    containerElement.appendChild(doneBtn);

    vacationsContainer.appendChild(containerElement);
}

function GetInputElements() {
    return [nameElement.value, dateElement.value, daysElement.value];
}

function ClearInputElements() {
    nameElement.value = "";
    dateElement.value = "";
    daysElement.value = "";
}

function EnableEditVacation() {
    editVacationBtn.disabled = false;
    addVacationBtn.disabled = true;
}

function DisableEditVacation() {
    editVacationBtn.disabled = true;
    addVacationBtn.disabled = false;
}
