const baseURL = "http://localhost:3030/jsonstore/tasks/";

const titleField = document.getElementById("course-name");
const typeField = document.getElementById("course-type");
const descriptionField = document.getElementById("description");
const teacherField = document.getElementById("teacher-name");

const coursesContainer = document.getElementById("list");

const loadCoursesBtn = document.getElementById("load-course");
const addCourseBtn = document.getElementById("add-course");
const editCourseBtn = document.getElementById("edit-course");

loadCoursesBtn.addEventListener("click", loadCourses);
addCourseBtn.addEventListener("click", addCourse);
editCourseBtn.addEventListener("click", putCourse);

async function loadCourses(e) {
    e.preventDefault();

    try {
        const response = await fetch(baseURL, { method: "get" });
        const data = await response.json();
        displayCourses(data);
        attachEventListeners();
    } catch (error) {
        console.log(error);
    }
}

async function addCourse(e) {
    e.preventDefault();
    const [title, type, description, teacher] = getInputFieldValues();

    if (!description || !teacher || !title || !type) return;

    let newCourse = {
        title,
        type,
        description,
        teacher,
    };
    try {
        await fetch(baseURL, { method: "post", body: JSON.stringify(newCourse) });
        clearInputFields();
        await loadCourses(e);
    } catch (error) {
        console.log(error);
    }
}

async function putCourse(e) {
    e.preventDefault();
    const courseId = e.target.dataset.courseId;
    const [title, type, description, teacher] = getInputFieldValues();

    if (!description || !teacher || !title || !type) return;

    const editedCourse = {
        title,
        type,
        description,
        teacher,
        _id: courseId,
    };

    try {
        await fetch(baseURL + courseId, { method: "put", body: JSON.stringify(editedCourse) });
        clearInputFields();
        await loadCourses(e);
        enableAddCourseBtn();
    } catch (error) {
        console.log(error);
    }
}

async function finishCourse(e) {
    const courseId = e.target.dataset.courseId;

    try {
        await fetch(baseURL + courseId, { method: "delete" });
        await loadCourses(e);
    } catch (error) {}
}

function editCourse(e) {
    e.preventDefault();
    const courseElement = e.target.closest("div");
    const title = courseElement.querySelector(":nth-child(1)").textContent;
    const teacher = courseElement.querySelector(":nth-child(2)").textContent;
    const type = courseElement.querySelector(":nth-child(3)").textContent;
    const description = courseElement.querySelector(":nth-child(4)").textContent;

    titleField.value = title;
    teacherField.value = teacher;
    typeField.value = type;
    descriptionField.value = description;

    editCourseBtn.dataset.courseId = e.target.dataset.courseId;
    disableAddCourseBtn();
}

function attachEventListeners() {
    let edithBtns = document.querySelectorAll(".container>button.edit-btn");
    let finishBtns = document.querySelectorAll(".container>button.finish-btn");

    Array.from(edithBtns).forEach((edithBtn) => {
        edithBtn.addEventListener("click", editCourse);
    });

    Array.from(finishBtns).forEach((finishBtn) => {
        finishBtn.addEventListener("click", finishCourse);
    });
}

function displayCourses(data) {
    coursesContainer.innerHTML = "";

    Object.values(data).forEach((record) => {
        const { description, teacher, title, type, _id } = record;

        const courseElement = document.createElement("div");
        courseElement.classList.add("container");

        const titleElement = document.createElement("h2");
        titleElement.textContent = title;

        const teacherElement = document.createElement("h3");
        teacherElement.textContent = teacher;

        const typeElement = document.createElement("h2");
        typeElement.textContent = type;

        const descriptionElement = document.createElement("h4");
        descriptionElement.textContent = description;

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit Course";
        editBtn.classList.add("edit-btn");
        editBtn.dataset.courseId = _id;

        const finishBtn = document.createElement("button");
        finishBtn.textContent = "Finish Course";
        finishBtn.classList.add("finish-btn");
        finishBtn.dataset.courseId = _id;

        courseElement.appendChild(titleElement);
        courseElement.appendChild(teacherElement);
        courseElement.appendChild(typeElement);
        courseElement.appendChild(descriptionElement);
        courseElement.appendChild(editBtn);
        courseElement.appendChild(finishBtn);

        coursesContainer.appendChild(courseElement);
    });
}

// HELPERS:
function getInputFieldValues() {
    return [titleField.value, typeField.value, descriptionField.value, teacherField.value];
}

function clearInputFields() {
    titleField.value = "";
    typeField.value = "";
    descriptionField.value = "";
    teacherField.value = "";
}

function disableAddCourseBtn() {
    addCourseBtn.disabled = "disabled";
    editCourseBtn.disabled = "";
}

function enableAddCourseBtn() {
    addCourseBtn.disabled = "";
    editCourseBtn.disabled = "disabled";
}
