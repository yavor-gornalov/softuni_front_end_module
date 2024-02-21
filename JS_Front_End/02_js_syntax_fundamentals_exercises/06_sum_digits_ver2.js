// https://judge.softuni.org/Contests/Compete/Index/3786#5

function sameNumbers(num) {
    let sum = 0;
    Array.from(num.toString()).forEach((digit) => {
        sum += parseInt(digit);
    });
    console.log(sum);
}

sameNumbers(245678);
