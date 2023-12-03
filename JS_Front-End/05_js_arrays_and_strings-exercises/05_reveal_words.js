// https://judge.softuni.org/Contests/Compete/Index/4360#4

function revealWords(string, text) {
    words = string.split(", ");
    words.sort((a, b) => b.length - a.length);
    for (let word of words) {
        let searched = "*".repeat(word.length);
        text = text.replace(searched, word);
    }
    console.log(text);
}

revealWords(
    "great",
    "softuni is ***** place for learning new programming languages"
);

revealWords(
    "great, learning",
    "softuni is ***** place for ******** new programming languages"
);
