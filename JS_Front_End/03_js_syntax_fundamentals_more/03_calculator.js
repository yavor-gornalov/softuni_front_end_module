// https://judge.softuni.org/Contests/Practice/Index/3787#2

function solve(first, operator, second) {
    let result;
    if (["+", "-", "*", "/"].includes(operator)) {
        result = eval(`${first}${operator}${second}`);
    }

    console.log(result.toFixed(2));
}

solve(5, "+", 10);
solve(25.5, "-", 3);
