window.addEventListener("load", solution);

function solution() {
    const inputSelectors = document.querySelectorAll("form>input, form>select")
    const previewListContainer = document.querySelector("ul.preview-list")
    const pendingListContainer = document.querySelector("ul.pending-list")
    const resolvedListContainer = document.querySelector("ul.resolved-list")
    
    const addBtn = document.querySelector("#add-btn")
    addBtn.addEventListener ("click", (e) => {
        e.preventDefault()
        let tokens = getInputValues(inputSelectors)
        if (tokens.some(value => value === "")) return

        createProblemContentElement(tokens)

        clearInputFields(inputSelectors)
        disableBtn(addBtn)
    })

    function createProblemContentElement (tokens) {
        let [employee, category, urgency, assignedTeam, description] = tokens

        //main content
        let problemContentContainer = createElement("li", previewListContainer, null, ["problem-content"])
        let articleElement = createElement("article", problemContentContainer)
        let employeeElement = createElement("p", articleElement, `From: ${employee}`)
        let categoryElement = createElement("p", articleElement, `Category: ${category}`)
        let urgencyElement = createElement("p", articleElement, `Urgency: ${urgency}`);
        let assignedTeamElement = createElement("p", articleElement, `Assigned to: ${assignedTeam}`)
        let descriptionElemement = createElement("p", articleElement, `Description: ${description}`)

        //buttons
        let editBtn = createElement("button", problemContentContainer, "Edit", ["edit-btn"])
        let continueBtn = createElement("button", problemContentContainer, "Continue", ["continue-btn"])

        //event listeners
        editBtn.addEventListener("click", ()=>{
            problemContentContainer.remove()
            for(let i = 0; i<tokens.length; i++) {
                inputSelectors[i].value = tokens[i]
            }
            enableButton(addBtn)
        })

        continueBtn.addEventListener("click", ()=> {
            problemContentContainer.remove()
            editBtn.remove()
            continueBtn.remove()
            let resolveBtn = createElement("button", problemContentContainer, "Resolved", ["resolve-btn"])
            pendingListContainer.appendChild(problemContentContainer)
            enableButton(addBtn)

            resolveBtn.addEventListener("click", () => {
                problemContentContainer.remove()
                resolveBtn.remove()
                let clearBtn = createElement("button", problemContentContainer, "Clear", ["clear-btn"])
                resolvedListContainer.appendChild(problemContentContainer)
                clearBtn.addEventListener("click", () => problemContentContainer.remove())
            })
        })

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
