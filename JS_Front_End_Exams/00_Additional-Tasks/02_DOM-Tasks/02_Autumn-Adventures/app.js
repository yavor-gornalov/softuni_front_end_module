window.addEventListener('load', solve);

function solve() {
    const inputSelectors = document.querySelectorAll("form>div>input")
    const addEventBtn = document.querySelector("#add-btn")
    const lastCheckContainer = document.querySelector("#check-list")
    const upcommingContainer = document.querySelector("#upcoming-list")
    const finishedContainer = document.querySelector("#finished-list")
    const clearBtn = document.querySelector("#clear")

    addEventBtn.addEventListener("click", ()=>{
        let tokens = getInputValues(inputSelectors)
        if (tokens.some(x => x === "")) return;

        createEventElement(tokens)
        clearInputFields(inputSelectors)
        disableAddEventBtn()

    })

    clearBtn.addEventListener("click", ()=> finishedContainer.innerHTML = "")

    function createEventElement(tokens) {
        let [time, date, place, event, contacts] = tokens
        let eventContainer = createElement("li", lastCheckContainer,null,["event-content"])
        let articleElement = createElement("article", eventContainer)
        let dateTimeElement = createElement("p", articleElement, `Begins: ${date} at: ${time}`)
        let placeElement = createElement("p", articleElement, `In: ${place}`)
        let eventElement = createElement("p", articleElement, `Event: ${event}`)
        let contactsElement = createElement("p", articleElement, `Contact: ${contacts}`)
        let editBtn = createElement("button", eventContainer, "Edit", ["edit-btn"])
        let continueBtn = createElement("button", eventContainer, "Continue", ["continue-btn"])

        editBtn.addEventListener("click", ()=> {
            for(let i = 0; i<tokens.length; i++){
                inputSelectors[i].value = tokens[i]
            }
            eventContainer.remove()
            enableAddEventBtn()
        })

        continueBtn.addEventListener("click", () => {
            eventContainer.remove()
            editBtn.remove()
            continueBtn.remove()
            let finishBtn = createElement("button", eventContainer, "Move to Finished", ["finished-btn"])
            upcommingContainer.appendChild(eventContainer)

            enableAddEventBtn()

            finishBtn.addEventListener("click", ()=> {
                eventContainer.remove()
                finishBtn.remove()
                finishedContainer.appendChild(eventContainer)
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

    function disableAddEventBtn () {
        addEventBtn.setAttribute("disabled", true)
    }

    function enableAddEventBtn () {
        addEventBtn.removeAttribute("disabled")
    }
}
