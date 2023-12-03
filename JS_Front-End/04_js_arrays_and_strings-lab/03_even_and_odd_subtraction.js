// https://judge.softuni.org/Contests/Practice/Index/4362#2

function evenAndOddSubtraction(numbers) {
    let result = 0;
    for (number of numbers) {
        if (number % 2 == 0) {
            result += number;
        } else {
            result -= number;
        }
    }
    console.log(result);
}

evenAndOddSubtraction([1, 2, 3, 4, 5, 6]);
evenAndOddSubtraction([3, 5, 7, 9]);
evenAndOddSubtraction([2, 4, 6, 8, 10]);
