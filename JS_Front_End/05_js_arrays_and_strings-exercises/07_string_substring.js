// https://judge.softuni.org/Contests/Compete/Index/4360#6

function stringSubstring(target, text) {
    words = text.toLowerCase().split(" ");
    let result = `${target} not found!`;

    if (words.includes(target)) {
        result = target;
    }
    console.log(result);
}

stringSubstring("javascript", "JavaScript is the best programming language");
stringSubstring("python", "JavaScript is the best programming language");
