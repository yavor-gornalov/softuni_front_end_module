
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

// function createElementVer2(type, content, parentNode, classes, id, useInnerHtml) {
//     const element = document.createElement(type);

//     if (content && useInnerHtml) {
//         element.innerHTML = content;
//     } else {
//         if (content && type !== "input") {
//             element.textContent = content;
//         }

//         if (content && type === "input") {
//             element.value = content;
//         }
//     }

//     if (classes && classes.length > 0) {
//         element.classList.add(...classes);
//     }

//     if (id) {
//         element.setAttribute("id", id);
//     }

//     if (parentNode) {
//         parentNode.appendChild(element);
//     }

//     return element;
// }