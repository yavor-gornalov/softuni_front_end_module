function solve(word, str) {
    re = new RegExp("\\b" + word + "\\b", "gmi");
    const result = re.test(str) ? word : `${word} not found!`;
    console.log(result);
}

solve("javascript", "JavaScript is the best programming language");
solve("python", "JavaScript is the best programming language");
