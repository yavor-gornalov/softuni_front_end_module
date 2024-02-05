window.addEventListener("load", solve);

function solve() {
    const expensesPreviewContainer = document.querySelector("#preview-list");
    const expensesListContainer = document.querySelector("#expenses-list");
    const addButton = document.querySelector("form #add-btn");
    const deleteButton = document.querySelector(".btn.delete");
    const [expenseField, amountField, dateField] = document.querySelectorAll(".expense-content input");

    addButton.addEventListener("click", () => {
        const expenseItem = document.createElement("li");
        const expense = expenseField.value;
        const amount = amountField.value;
        const date = dateField.value;
        clearInputs();

        if (!expense || !amount || !date) return;

        addButton.disabled = true;
        expenseItem.setAttribute("class", "expense-item");
        expenseItem.innerHTML = `<article>
                                    <p>Type: ${expense}</p>
                                    <p>Amount: ${amount}$</p>
                                    <p>Date: ${date}</p>
                                </article>
                                <div class="buttons">
                                    <button class="btn edit">edit</button>
                                    <button class="btn ok">ok</button>
                                </div>`;
        expensesPreviewContainer.appendChild(expenseItem);

        const editBtn = expenseItem.querySelector(".btn.edit");
        editBtn.addEventListener("click", () => {
            expenseField.value = expense;
            amountField.value = amount;
            dateField.value = date;
            expensesPreviewContainer.replaceChildren();
            addButton.disabled = false;
        });

        const okBtn = expenseItem.querySelector(".btn.ok");
        okBtn.addEventListener("click", () => {
            console.log("click");
            expenseItem.querySelector('.buttons').remove()
            expensesListContainer.appendChild(expenseItem);
            expensesPreviewContainer.replaceChildren();
            addButton.disabled = false;
        });
    });

    deleteButton.addEventListener("click", () => {
        location.reload()
    });

    function clearInputs() {
        expenseField.value = "";
        amountField.value = "";
        dateField.value = "";
    }
}
