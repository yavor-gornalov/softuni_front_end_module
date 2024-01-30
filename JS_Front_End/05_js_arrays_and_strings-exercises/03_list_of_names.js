// https://judge.softuni.org/Contests/Compete/Index/4360#2

function listOfNames(list) {
    list.sort((a, b) => a.localeCompare(b));
    let idx = 1;
    for (firstName of list) {
        console.log(`${idx}.${firstName}`);
        idx++;
    }
}

listOfNames(["John", "Bob", "Christina", "Ema"]);
