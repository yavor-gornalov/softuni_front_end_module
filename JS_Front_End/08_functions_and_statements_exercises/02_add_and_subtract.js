// https://judge.softuni.org/Contests/Compete/Index/3789#1

function addSubtract(first, second, third) {
    let subtract = (a, b) => a - b;
    let sum = (a, b) => a + b;

    console.log(subtract(sum(first, second), third));
}

addSubtract(23, 6, 10);
addSubtract(1, 17, 30);
addSubtract(42, 58, 100);
