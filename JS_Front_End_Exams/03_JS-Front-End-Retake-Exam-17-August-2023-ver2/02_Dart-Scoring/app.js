window.addEventListener("load", solve);

function solve() {
    const inputSelectors = document.querySelectorAll(".scoring-content input")
    const sureListContainer = document.querySelector("#sure-list")
    const scoreboardListContainer = document.querySelector("#scoreboard-list")
    
    const addBtn = document.querySelector("#add-btn")
    addBtn.addEventListener("click", (e) => {
        e.preventDefault()
        let tokens = getInputValues(inputSelectors)
        
        if (tokens.some(val => val === "")) return;

        createScoreElement(tokens)

        disableBtn(addBtn)
        clearInputFields(inputSelectors)
    })

    const clearBtn = document.querySelector(".btn.clear")
    clearBtn.addEventListener("click", ()=> location.reload())

    function createScoreElement(tokens) {
        let [name, score, round] = tokens

        let dartItemElement = createElement("li", sureListContainer, null, ["dart-item"])
        let articleElement = createElement("article", dartItemElement)
        let nameElement = createElement("p", articleElement,name)
        let scoreElement = createElement("p", articleElement, `Score: ${score}`)
        let roundElement = createElement("p", articleElement, `Round: ${round}`)
        let editBtn = createElement("button", dartItemElement, "edit", ["btn", "edit"])
        let okBtn = createElement("button", dartItemElement, "ok", ["btn", "ok"])

        editBtn.addEventListener("click", (e)=>{
            e.preventDefault()
            for(let i=0; i<inputSelectors.length; i++) {
                inputSelectors[i].value = tokens[i]
            }
            dartItemElement.remove()
            enableButton(addBtn)
        })

        okBtn.addEventListener("click", (e)=> {
            e.preventDefault()
            dartItemElement.remove()
            editBtn.remove()
            okBtn.remove()
            scoreboardListContainer.appendChild(dartItemElement)
            enableButton(addBtn)
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
        button.setAttribute("disabled", true);
    }

    function enableButton(button) {
        button.removeAttribute("disabled");
    }
}
  