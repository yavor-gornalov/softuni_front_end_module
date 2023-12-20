function validate() {
    let emailElement = document.getElementById("email");
    emailElement.addEventListener("change", checkEmail);

    function checkEmail() {
        pattern = /[a-z]+@[a-z]+\.[a-z]+/gm;
        if (pattern.test(this.value)) {
            this.classList.remove("error");
        } else {
            this.classList.add("error");
        }
    }
}
