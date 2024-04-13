const baseURL = "http://localhost:3030/jsonstore/tasks/"

const inputSelectors = [
    document.querySelector("#course-name"),
    document.querySelector("#course-type"),
    document.querySelector("#description"),
    document.querySelector("#teacher-name"),
];
const coursesDivContainer = document.querySelector("div#list")
const loadCoursesBtn = document.querySelector("#load-course")
const [addCourseBtn, editCourseBtn] = document.querySelectorAll("#form button")

loadCoursesBtn.addEventListener("click", loadCourses)
addCourseBtn.addEventListener("click", addCourse)
editCourseBtn.addEventListener("click", editCourse)


async function loadCourses (e) {
    e.preventDefault()
    coursesDivContainer.innerHTML = "";
    let response = await fetch(baseURL)
    let coursesData = await response.json()
    for (const course of Object.values(coursesData)) {
        let tokens = Object.values(course)
        const courseElement = createCourseElement(tokens)
        coursesDivContainer.appendChild(courseElement)
    }
}

async function addCourse (e) {
    e.preventDefault();
    let tokens = getInputValues(inputSelectors);
    if (tokens.some((x) => x === "")) return;

    let [title, type, description, teacher] = tokens;

    let newCourse = {
        title,
        type,
        description,
        teacher,
    };
    clearInputFields(inputSelectors);

    await fetch(baseURL, { method: "post", body: JSON.stringify(newCourse) });
    await loadCourses(e);
}

async function editCourse (e) {
    e.preventDefault();
    let tokens = getInputValues(inputSelectors);
    if (tokens.some((x) => x === "")) return;

    let [title, type, description, teacher] = tokens;
    let courseId = e.target.dataset.courseId;
    let newCourse = {
        title,
        type,
        description,
        teacher,
        _id: courseId,
    };

    clearInputFields(inputSelectors)
    await fetch(baseURL + courseId, { method: "put", body: JSON.stringify(newCourse) });
    enableButton(addCourse);
    disableBtn(editCourse);
    await loadCourses(e);
}

async function deleteCourse (e, courseId) {
    e.preventDefault()

    await fetch(baseURL + courseId, {method: "delete"})
    await loadCourses(e)
}

function populateInputForm(e, tokens) {
    e.preventDefault()
    editCourseBtn.dataset.courseId = tokens.pop()

    for(let i = 0; i<tokens.length; i++) {
        inputSelectors[i].value = tokens[i]
    }

    e.target.parentElement.remove()

    disableBtn(addCourseBtn)
    enableButton(editCourseBtn)
}

function createCourseElement (tokens) {
    let [title, type, description, teacher, _id] = tokens

    const courseElement = createElement("div", null, null, ["container"])
    const titleElement = createElement("h2", courseElement, title)    
    const teacherElement = createElement("h3", courseElement, teacher)
    const typeElement = createElement("h3", courseElement, type)
    const descriptionElement = createElement("h4", courseElement, description)

    const editBtn = createElement("button", courseElement, "Edit Course", ["edit-btn"])
    const finishBtn = createElement("button", courseElement, "Finish Course", ["finish-btn"])

    editBtn.addEventListener("click", (e) => populateInputForm(e, tokens))
    finishBtn.addEventListener("click", (e) => deleteCourse(e, _id))

    return courseElement
}

// HELPERS
function createElement(tagName, parentElement, textContent, classList, elementId) {
    const element = document.createElement(tagName);
    if (textContent) {
        element[tagName === "input" ? "value" : "textContent"] = textContent;
    }
    if (Array.isArray(classList)) {
        element.classList.add(...classList);
    }
    if (elementId) {
        element.setAttribute("id", elementId);
    }
    if (parentElement) {
        parentElement.appendChild(element);
    }
    return element;
}

function getInputValues(inputSelectors) {
    return Array.from(inputSelectors).map((x) => x.value);
}

function clearInputFields(inputSelectors) {
    Array.from(inputSelectors).forEach((x) => (x.value = ""));
}

function disableBtn(button) {
    button.disabled = "disabled"
}

function enableButton(button) {
    button.disabled = ""
}