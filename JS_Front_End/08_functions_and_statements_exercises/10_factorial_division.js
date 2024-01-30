// https://judge.softuni.org/Contests/Compete/Index/3789#9

function factorialDivision(first, second) {
    let factorial = (x) => (x > 1 ? x * factorial(x - 1) : 1);
    console.log(`${(factorial(first) / factorial(second)).toFixed(2)}`);
}

factorialDivision(6, 2);
factorialDivision(2, 6);
