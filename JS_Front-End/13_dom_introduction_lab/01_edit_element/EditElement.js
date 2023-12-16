function editElement(element, matcher, replacer) {
    pattern = new RegExp(matcher, "g");
    element.textContent = element.textContent.replace(pattern, replacer);
}