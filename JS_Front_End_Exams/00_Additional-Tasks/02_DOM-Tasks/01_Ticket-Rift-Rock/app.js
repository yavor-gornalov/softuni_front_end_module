window.addEventListener("load", solve);

function solve() {
    const inputSelectors = Array.from(document.querySelector("form.ticket-form").children);
    const ticketPreviewContainer = document.querySelector("#ticket-preview");
    const ticketPurchaseContainer = document.querySelector("#ticket-purchase")
    const bottomContentElement = document.querySelector("div.bottom-content")

    const purchaseBtn = document.querySelector("#purchase-btn");
    purchaseBtn.addEventListener("click", purchaseTicket);

    function purchaseTicket() {
        let ticketData = getInputValues();
        clearInputFields();
        disablePurchaseBtn();

        if (ticketData.some((x) => x === "")) {
            return
        }

        createTitcketElement(...ticketData);
    }

    function createTitcketElement(
        numberOfTickets,
        seatingPreference,
        fullName,
        email,
        phoneNumber
    ) {
        const ticketElement = createElement("li",ticketPreviewContainer, null, ["ticket-purchase"])
        // main content
        const articleElement = createElement("article", ticketElement)
        const countElement = createElement("p", articleElement, `Count: ${numberOfTickets}`) 
        const preferenceElement = createElement("p", articleElement, `Preference: ${seatingPreference}`)
        const fullNameElement = createElement("p", articleElement, `To: ${fullName}`)
        const emailElement = createElement("p", articleElement, `Email: ${email}`)
        const phoneElement = createElement("p", articleElement, `Phone Number: ${phoneNumber}`)
        // buttons
        const buttonsContainer = createElement("div", ticketElement, null, ["btn-container"])
        const editBtn = createElement("button", buttonsContainer,"Edit", ["edit-btn"])
        const nextBtn = createElement("button", buttonsContainer, "Next", ["next-btn"])

        editBtn.addEventListener("click", () => {
            let values = [numberOfTickets, seatingPreference, fullName, email, phoneNumber];
            for (let idx = 0; idx < inputSelectors.length; idx++) {
                inputSelectors[idx].value = values[idx]
            }
            enablePurchaseBtn()
            ticketElement.remove()
        })

        nextBtn.addEventListener("click", () => {
            // Do not use appendChild to move directly element - judge test fails
            ticketElement.remove()
            buttonsContainer.remove();
            const buyBtn = createElement("button", articleElement, "Buy", ["buy-btn"]);
            ticketPurchaseContainer.appendChild(ticketElement); 

            buyBtn.addEventListener("click", () => {
                ticketElement.remove();
                const messageElement = createElement(
                    "h2",
                    bottomContentElement,
                    "Thank you for your purchase!"
                );
                const backBtn = createElement("button", bottomContentElement, "Back", ["back-btn"]);
                backBtn.addEventListener("click", () => location.reload());
            });
        });



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

    function getInputValues() {
        return inputSelectors.map((x) => x.value);
    }

    function clearInputFields() {
        inputSelectors.forEach((x) => (x.value = ""));
    }

    function disablePurchaseBtn() {
        purchaseBtn.setAttribute("disabled", true);
    }

    function enablePurchaseBtn() {
        purchaseBtn.removeAttribute("disabled");
    }
}
