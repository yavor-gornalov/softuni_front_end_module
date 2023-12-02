// https://judge.softuni.org/Contests/Practice/Index/3787#0

function validityChecker(x1, y1, x2, y2) {
    let firstToZero = Math.sqrt((0 - x1) ** 2 + (0 - y1) ** 2);
    let secondToZero = Math.sqrt((x2 - 0) ** 2 + (y2 - 0) ** 2);
    let firstToSecond = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

    let firstToZeroIsValid = firstToZero % 1 ? "invalid" : "valid";
    let secondToZeroIsValid = secondToZero % 1 ? "invalid" : "valid";
    let firstToSecondIsValid = firstToSecond % 1 ? "invalid" : "valid";

    console.log(`{${x1}, ${y1}} to {0, 0} is ${firstToZeroIsValid}`);
    console.log(`{${x2}, ${y2}} to {0, 0} is ${secondToZeroIsValid}`);
    console.log(`{${x1}, ${y1}} to {${x2}, ${y2}} is ${firstToSecondIsValid}`);
}

validityChecker(3, 0, 0, 4);
validityChecker(2, 1, 1, 1);
