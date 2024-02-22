function solve(...args) {
    let [secretWords, message] = args;
    secretWords.split(", ").forEach((word) => {
        let target = "*".repeat(word.length)
        message = message.replace(target, word)
    });
    console.log(message);
}

solve("great", "softuni is ***** place for learning new programming languages");
solve(
    "great, learning",
    "softuni is ***** place for ******** new programming languages"
);
