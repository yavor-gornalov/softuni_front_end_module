function solve() {
    const correctAnswers = ["onclick", "JSON.stringify()", "A programming API for HTML and XML documents"];

    const sections = Array.from(document.getElementsByTagName("section"));

    const resultSection = document.querySelector("#results");
    const resultField = document.querySelector("#results h1");

    let rightAnswers = 0;
    for (let idx = 0; idx < sections.length; idx++) {
        const section = sections[idx];
        const [firstButton, secondButton] = section.querySelectorAll("li p");
        firstButton.addEventListener("click", checkAnswer);
        secondButton.addEventListener("click", checkAnswer);

        function checkAnswer(e) {
            let currentAnswer = e.currentTarget.textContent;
            section.style.display = "none";
            if (currentAnswer === correctAnswers[idx]) {
                rightAnswers++;
            }

            if (idx < sections.length - 1) {
                sections[idx + 1].style.display = "block";
            } else {
                displayResults();
            }
        }

        function displayResults() {
            resultSection.style.display = "block";
            if (rightAnswers === correctAnswers.length) {
                resultField.textContent = "You are recognized as top JavaScript fan!";
            } else {
                resultField.textContent = `You have ${rightAnswers} right answers`;
            }
        }
    }
}
