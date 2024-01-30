// https://judge.softuni.org/Contests/Compete/Index/3789#3

function oddEvenSum(number) {
    let isOdd = (num) => num % 2;
    let oddSum = 0;
    let evenSum = 0;

    let arrayOfDigits = [];

    for (const digit of number.toString().split("")) {
        currentDigit = parseInt(digit);
        if (isOdd(currentDigit)) {
            oddSum += currentDigit;
        } else {
            evenSum += currentDigit;
        }
    }
    console.log(`Odd sum = ${oddSum}, Even sum = ${evenSum}`);
}

oddEvenSum(1000435);
oddEvenSum(3495892137259234);
