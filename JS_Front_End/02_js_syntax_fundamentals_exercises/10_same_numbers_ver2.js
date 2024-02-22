function solve(number) {
    const lastDigit = number % 10;
    let digitSum = 0;
    let sameDigits = true;
    while (number > 0) {
        let currentDigit = number % 10;
        sameDigits = lastDigit === currentDigit ? true : false;
        digitSum += number % 10;
        number = Math.floor(number / 10);
    }
    console.log(`${sameDigits}\n${digitSum}`);
}

solve(2222222);
solve(1234);
