// https://judge.softuni.org/Contests/Practice/Index/4362#0

function sumFirstAndLastArrayElements(numbers) {
    minNumber = numbers[0];
    maxNumber = numbers[numbers.length - 1];
    console.log(minNumber + maxNumber);
}

sumFirstAndLastArrayElements([20, 30, 40]);
sumFirstAndLastArrayElements([10, 17, 22, 33]);
sumFirstAndLastArrayElements([11, 58, 69]);
