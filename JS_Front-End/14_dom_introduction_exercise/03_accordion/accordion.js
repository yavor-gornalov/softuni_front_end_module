function toggle() {
    buttonElement = document.getElementsByClassName("button")[0];
    textElement = document.getElementById("extra");

    if (buttonElement.textContent === "More") {
        buttonElement.textContent = "Less";
        textElement.style.display = "block";
    } else {
        buttonElement.textContent = "More";
        textElement.style.display = "none";
    }
}
