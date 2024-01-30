function solve() {
    const checkBtn = document.querySelector("button:first-child");
    const clearBtn = document.querySelector("button:last-child");
    const table = document.getElementsByTagName("table")[0];
    const output = document.querySelector("#check>p");

    checkBtn.addEventListener("click", () => {
        const inputFields = Array.from(document.querySelectorAll("tbody input"));

        let matrix = [];
        for (let r = 0; r < 3; r++) {
            matrix[r] = [];
            for (let c = 0; c < 3; c++) {
                let field = inputFields.shift().value;
                matrix[r].push(field);
            }
        }

        let hasFailed = false;
        for (let r = 0; r < 3; r++) {
            let rowUniques = new Set(matrix[r]);
            if (rowUniques.size !== 3) {
                hasFailed = true;
                break;
            }
        }
        for (c = 0; c < 3; c++) {
            let column = [];
            for (let r = 0; r < 3; r++) {
                column.push(matrix[r][c]);
            }
            let columnUniques = new Set(column);
            if (columnUniques.size !== 3) {
                hasFailed = true;
                break;
            }
        }

        if (!hasFailed) {
            table.style.border = "2px solid green";
            output.style.color = "green";
            output.textContent = "You solve it! Congratulations!";
        } else {
            table.style.border = "2px solid red";
            output.style.color = "red";
            output.textContent = "NOP! You are not done yet...";
        }
    });

    clearBtn.addEventListener("click", () => {
        const inputFields = Array.from(document.querySelectorAll("tbody input"));
        inputFields.forEach((field) => {
            field.value = "";
        });
        table.style.border = "";
        output.style.color = "";
        output.textContent = "";
    });
}
