// https://judge.softuni.org/Contests/Compete/Index/3786#3

function printAndSum(first, second) {
    let array = [];
    let sum = 0;
    for (let i = first; i <= second; i++) {
        array.push(i);
        sum += i;
    }
    console.log(`${array.join(" ")}\nSum: ${sum}`);
}

printAndSum(5, 10);
printAndSum(0, 26);
