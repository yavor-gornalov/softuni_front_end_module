// https://judge.softuni.org/Contests/Compete/Index/3789#7

function perfectNumber(num) {
    let divisorsSum = 0;
    for (divisor = Math.ceil(num / 2); divisor > 0; divisor--) {
        if (num % divisor == 0) divisorsSum += divisor;
    }
    if (num === divisorsSum) {
        console.log("We have a perfect number!");
    } else {
        console.log("It's not so perfect.");
    }
}

perfectNumber(6);
perfectNumber(28);
perfectNumber(1236498);
