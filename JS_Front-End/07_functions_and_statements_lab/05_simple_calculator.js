// https://judge.softuni.org/Contests/Practice/Index/3788#4

function simpleCalculator(numOne, numTwo, operator) {
    let operations = {
        multiply: (a, b) => a * b,
        divide: (a, b) => a / b,
        add: (a, b) => a + b,
        subtract: (a, b) => a - b,
    };

    console.log(operations[operator](numOne, numTwo));
}

simpleCalculator(5, 5, "multiply");
simpleCalculator(40, 8, "divide");
simpleCalculator(12, 19, "add");
simpleCalculator(50, 13, "subtract");
