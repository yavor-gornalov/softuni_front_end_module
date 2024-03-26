// https://judge.softuni.org/Contests/Compete/Index/3789#3

function oddEvenSum(number) {
    let isOdd = (num) => num % 2;

    let oddSum = number.toString()
                    .split("")
                    .filter(x => isOdd(x))
                    .reduce((sum, x) => sum + Number(x), 0);
                    6
    let evenSum = number.toString()
                    .split("")
                    .filter(x => !isOdd(x))
                    .reduce((sum, x) => sum + Number(x), 0);
    
    console.log(`Odd sum = ${oddSum}, Even sum = ${evenSum}`);


}

oddEvenSum(1000435);
oddEvenSum(3495892137259234);
