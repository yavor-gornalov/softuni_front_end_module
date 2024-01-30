function lockedProfile() {
    const showHideButtons = Array.from(document.querySelectorAll("div[class=profile]>button"));

    showHideButtons.forEach((button) => {
        button.addEventListener("click", showHideInfo);
    });

    function showHideInfo(e) {
        const radioButtons = Array.from(this.parentNode.querySelectorAll("input[type=radio]"));
        const isUserLocked = radioButtons.filter((radio) => radio.checked)[0].value;
        const hiddenInfo = this.parentNode.querySelector("div[id$='HiddenFields']");

        if (isUserLocked === "unlock") {
            if (this.textContent === "Show more") {
                hiddenInfo.style.display = "block";
                this.textContent = "Hide it";
            } else {
                hiddenInfo.style.display = "";
                this.textContent = "Show more";
            }
        }
    }
}
