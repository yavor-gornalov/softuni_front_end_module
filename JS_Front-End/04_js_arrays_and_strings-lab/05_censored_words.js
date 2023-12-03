// https://judge.softuni.org/Contests/Practice/Index/4362#4

function censoredWords(text, word) {
    let result = text
    while (result.includes(word)) {
        result = result.replace(word, "*".repeat(word.length));
    }
    console.log(result);
}

censoredWords("A small sentence with some words", "small");
censoredWords("Find the hidden word", "hidden");
