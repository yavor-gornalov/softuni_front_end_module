// https://judge.softuni.org/Contests/Compete/Index/3789#4

function palindromeIntegers(numbers) {
    const isPalindrome = (x) => x.toString() === x.toString().split("").reverse().join("");;

    numbers.forEach(x => console.log(isPalindrome(x)));
}

palindromeIntegers([123, 323, 421, 121]);
palindromeIntegers([32, 2, 232, 1010]);
