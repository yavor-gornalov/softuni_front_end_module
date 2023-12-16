function extract(elementId) {
    pattern = /\(([^)]+)\)/gm;

    contentElement = document.getElementById(elementId);
    let matches = [...contentElement.textContent.matchAll(pattern)];

    return matches.map((match) => match[1]).join("; ");
}

// function extract(elementId) {
//     let para = document.getElementById(elementId).textContent;
//     let pattern = /\(([^)]+)\)/g;
//     let result = [];
//     let match = pattern.exec(para);
//     while (match) {
//         result.push(match[1]);
//         match = pattern.exec(para);
//     }
//     return result.join("; ");
// }
