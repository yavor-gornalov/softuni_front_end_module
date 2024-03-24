window.addEventListener("load", solve);

function solve() {
    const nameElement = document.getElementById("player");
    const scoreElement = document.getElementById("score");
    const roundElement = document.getElementById("round");
    const addButton = document.getElementById("add-btn");
    const sureListElement = document.getElementById("sure-list");
    const scoreBoardElement = document.getElementById("scoreboard-list");
    const clearBtnElement = document.querySelector("button.btn.clear");

    clearBtnElement.addEventListener("click", () => {
        location.reload();
    });

    addButton.addEventListener("click", () => {
        const name = nameElement.value;
        const score = Number(scoreElement.value);
        const round = Number(roundElement.value);

        [nameElement, scoreElement, roundElement].forEach(
            (x) => (x.value = "")
        );

        if (!name || !score || !round) return;

        const liElement = document.createElement("li");
        liElement.classList.add("dart-item");

        const articleElement = document.createElement("article");

        const pNameElement = document.createElement("p");
        pNameElement.textContent = name;

        const pScoreElement = document.createElement("p");
        pScoreElement.textContent = `Score: ${score}`;

        const pRoundElement = document.createElement("p");
        pRoundElement.textContent = `Round: ${round}`;

        articleElement.appendChild(pNameElement);
        articleElement.appendChild(pScoreElement);
        articleElement.appendChild(pRoundElement);

        const editBtnElement = document.createElement("button");
        editBtnElement.textContent = "edit";
        editBtnElement.classList.add("btn");
        editBtnElement.classList.add("edit");

        const okBtnElement = document.createElement("button");
        okBtnElement.textContent = "ok";
        okBtnElement.classList.add("btn");
        okBtnElement.classList.add("ok");

        liElement.appendChild(articleElement);
        liElement.appendChild(editBtnElement);
        liElement.appendChild(okBtnElement);

        sureListElement.appendChild(liElement);

        addButton.disabled = true;

        editBtnElement.addEventListener("click", () => {
            nameElement.value = name;
            scoreElement.value = score;
            roundElement.value = round;

            addButton.disabled = false;

            sureListElement.removeChild(liElement);
        });

        okBtnElement.addEventListener("click", () => {
            liElement.removeChild(editBtnElement);
            liElement.removeChild(okBtnElement);
            scoreBoardElement.appendChild(liElement);

            addButton.disabled = false;
        });
    });
}
