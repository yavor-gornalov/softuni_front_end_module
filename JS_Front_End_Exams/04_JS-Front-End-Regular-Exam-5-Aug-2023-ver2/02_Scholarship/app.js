window.addEventListener("load", solve);

function solve() {
    const inputSelectors = document.querySelectorAll(".applyContent>input")
    const previewListContainer = document.querySelector("#preview-list")
    const candidatesListContainer = document.querySelector("#candidates-list")

    const nextBtn = document.querySelector(".applyContent>button")

    nextBtn.addEventListener("click", (e) => applyStudent(e, previewListContainer))

    function applyStudent(e, parentElement) {
        e.preventDefault()
        let tokens = getInputValues(inputSelectors)

        if(tokens.some(val => val === "")) return

        createStudentApplicationElement(parentElement, tokens)

        disableBtn(nextBtn)
        clearInputFields(inputSelectors)
    }

    function fillInputForm(e, domElement, tokens) {
        e.preventDefault()
        for(let i = 0; i < tokens.length; i++){
            inputSelectors[i].value = tokens[i];
        }
        domElement.remove()
        enableButton(nextBtn)
    }

    function confirmApplication(e, domElement, parrentContainer) {
        e.preventDefault()
        let buttons = domElement.querySelectorAll("button")
        Array.from(buttons).forEach(b => b.remove())
        parrentContainer.appendChild(domElement)
        enableButton(nextBtn)
    }

    function createStudentApplicationElement(parentElement, tokens){
        let [name, university, score] = tokens

        let studentApplicationElement = createElement("li", parentElement, null, ["application"])
        let articleElement = createElement("article", studentApplicationElement)
        let nameElement = createElement("h4", articleElement, name)
        let universityElement = createElement("p", articleElement, `University: ${university}`)
        let scoreElement = createElement("p", articleElement, `Score: ${score}`)
        
        let editBtn = createElement("button", studentApplicationElement, "edit", ["action-btn", "edit"])
        let applyBtn = createElement("button", studentApplicationElement, "apply", ["action-btn", "apply"])

        editBtn.addEventListener("click", (e) => fillInputForm(e,studentApplicationElement, tokens))
        applyBtn.addEventListener("click", (e) => confirmApplication(e,studentApplicationElement, candidatesListContainer))

    }

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
        button.setAttribute("disabled", true)
    }
    
    function enableButton(button) {
        button.removeAttribute("disabled")
    }
}
