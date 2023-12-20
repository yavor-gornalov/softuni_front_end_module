function focused() {
    elements = Array.from(document.querySelectorAll("div>input"));
    elements.forEach((element) => {
        element.addEventListener("focus", focusElement);
        element.addEventListener("blur", blurElement);
    });

    function focusElement() {
        parent = this.parentNode;
        parent.classList.add("focused");
    }

    function blurElement() {
        parent = this.parentNode;
        parent.classList.remove("focused");
    }
}
