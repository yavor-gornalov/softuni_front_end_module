function extractText() {
    const items = Array.from(document.getElementsByTagName("li"));
    const textAreaElement = document.getElementById("result");
    
    textAreaElement.textContent = items.map((el) => el.textContent).join("\n");
}
