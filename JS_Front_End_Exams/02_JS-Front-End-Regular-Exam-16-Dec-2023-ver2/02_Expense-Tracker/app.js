window.addEventListener("load", solve);

function solve() {
    const inputSelectors  = document.querySelectorAll(".expense-content input")
    const previewListContainer = document.querySelector("#preview-list")
    const expensesListContainer = document.querySelector("#expenses-list")
    
    const addBtn = document.querySelector("#add-btn")
    addBtn.addEventListener("click", (e) => {
        e.preventDefault()
        let tokens = getInputValues(inputSelectors)
        if (tokens.some(val => val === "")) {
            return
        }
        createExpenseItemElement(tokens);
        disableBtn(addBtn)
        clearInputFields(inputSelectors)
    })

    const deleteBtn = document.querySelector(".btn.delete")
    deleteBtn.addEventListener("click", (e)=>{
        location.reload()
    })

    function createExpenseItemElement(tokens) {
        let [type, amount, date] = tokens;

        let expenseContentElement = createElement("li", previewListContainer, null, ["expense-item"])
        let articleElement = createElement("article", expenseContentElement)
        let typeElement = createElement("p", articleElement, `Type: ${type}`)
        let amountElement = createElement("p", articleElement, `Amount: ${amount}$`)
        let dateElement = createElement("p", articleElement, `Date: ${date}`)
        
        let buttonsContainer = createElement("div", expenseContentElement, null, ["buttons"])
        let editBtn = createElement("button", buttonsContainer, "edit", ["btn", "edit"])
        let okBtn = createElement("button", buttonsContainer, "ok", ["btn", "ok"])

        editBtn.addEventListener("click", (e)=>{
            e.preventDefault()
            for(let i=0; i<tokens.length; i++){
                inputSelectors[i].value = tokens[i]
            }
            expenseContentElement.remove()
            enableButton(addBtn)
            
        })

        okBtn.addEventListener("click", (e) => {
            e.preventDefault()
            expenseContentElement.remove()
            buttonsContainer.remove()
            expensesListContainer.appendChild(expenseContentElement)
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
        button.setAttribute("disabled", true)
    }

    function enableButton(button) {
        button.removeAttribute("disabled")
    }
}