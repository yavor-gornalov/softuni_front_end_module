// https://judge.softuni.org/Contests/Compete/Index/3789#2

function charsInRange(firstChar, secondChar) {
    let characters = [];
    let first = firstChar.charCodeAt(0);
    let second = secondChar.charCodeAt(0);

    let start = Math.min(first, second)
    let end = Math.max(first, second)

    for (let idx = start + 1; idx < end; idx++) {
        let char = String.fromCharCode(idx);
        characters.push(char);
    }

    console.log(characters.join(" "));
}

charsInRange("a", "d");
charsInRange("#", ":");
charsInRange("C", "#");
