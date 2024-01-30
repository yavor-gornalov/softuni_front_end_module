// https://judge.softuni.org/Contests/Practice/Index/4362#1

function reverseAnArrayOfNumbers(count, numbers) {
    let result = [];
    arrLength = numbers.length;
    result = numbers.splice(0,count)
    console.log(result.reverse().join(" "))
}

reverseAnArrayOfNumbers(3, [10, 20, 30, 40, 50]);
reverseAnArrayOfNumbers(4, [-1, 20, 99, 5]);
reverseAnArrayOfNumbers(2, [66, 43, 75, 89, 47]);
