// https://judge.softuni.org/Contests/Compete/Index/3789#2

function charsInRange(...range) {
    range.sort()
    let [start, end]  = range.map(x => x.charCodeAt(0))
    let characters = [];
    for (let idx = start + 1; idx < end; idx++) {
        let char = String.fromCharCode(idx);
        characters.push(char);
    }
    console.log(characters.join(" "));
}

charsInRange("a", "d");
charsInRange("#", ":");
charsInRange("C", "#");