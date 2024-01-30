// https://judge.softuni.org/Contests/Compete/Index/3792#5

    function wordsTracker(data) {
        let words = data.shift();
        let text = data.join(" ");

        wordOccurrences = {};

        for (const word of words.split(" ")) {
            let re = RegExp(`\\b${word}\\b`, "gm");
            let matches = text.match(re);
            wordOccurrences[word] = matches ? matches.length : 0;
        }

        sortedWords = Object.entries(wordOccurrences).sort((a, b) => b[1] - a[1]);

        sortedWords.forEach(([word, occurrences]) => {
            console.log(`${word} - ${occurrences}`);
        });
    }

// TESTS:
wordsTracker([
    "not sentence exist this",
    "In",
    "this",
    "sentence",
    "you",
    "have",
    "to",
    "count",
    "the",
    "occurrences",
    "of",
    "the",
    "words",
    "this",
    "and",
    "sentence",
    "because",
    "this",
    "is",
    "your",
    "task",
]);
