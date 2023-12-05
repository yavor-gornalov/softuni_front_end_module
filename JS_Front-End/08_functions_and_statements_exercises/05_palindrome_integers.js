// https://judge.softuni.org/Contests/Compete/Index/3789#4

function palindromeIntegers(numbers) {
    function reversedNumber(num) {
        let strNum = num.toString();
        digits = strNum.split("").reverse();
        return digits.join("");
    }
    for (const number of numbers) {
        console.log(number == reversedNumber(number));
    }
}

palindromeIntegers([123, 323, 421, 121]);
palindromeIntegers([32, 2, 232, 1010]);
