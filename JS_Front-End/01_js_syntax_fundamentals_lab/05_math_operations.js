// https://judge.softuni.org/Contests/Practice/Index/3785#4

function solve(first, second, operator) {
    let result;
    if (["+", "-", "*", "/", "%", "**"].includes(operator)) {
        result = eval(`${first}${operator}${second}`);
    }

    console.log(result);
}

solve(1, 2, "*");
