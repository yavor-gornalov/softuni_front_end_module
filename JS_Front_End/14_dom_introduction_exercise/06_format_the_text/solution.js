function solve() {
    const rawText = document.getElementById("input").value;
    const sentences = rawText.split(".");
    let outputElement = document.getElementById("output");

    let counter = 0;
    let output = [];

    let paragraph = [];
    while (sentences.length > 0) {
        // let paragraph = `<p></p>`
        let sentence = sentences.shift().trim();
        if (sentence.length > 0) {
            paragraph.push(sentence);
            counter += 1;
        }
        if (paragraph.length > 0 && (sentences.length === 0 || counter == 3)) {
            output.push(`<p>${paragraph.join(". ")}.</p>`);
            counter = 0;
            paragraph = [];
        }
    }

    outputElement.innerHTML = output.join("");
}
// first. . . second. third. fourth. fifth. sixth. seventh.
