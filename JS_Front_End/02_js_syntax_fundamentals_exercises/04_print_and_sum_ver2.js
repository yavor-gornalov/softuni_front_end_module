// https://judge.softuni.org/Contests/Compete/Index/3786#3

function solve(first, second) {
    let sum = 0;
    let result = "";
    for (let i = first; i <= second; i++) {
        result += `${i} `
        sum += i;
    }
    console.log(`${result}\nSum: ${sum}`);
}

solve(5, 10);
solve(0, 26);
