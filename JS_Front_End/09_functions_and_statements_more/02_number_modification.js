// https://judge.softuni.org/Contests/Practice/Index/3790#1

function numberModification(number) {
    numToString = number.toString();

    avg = (num) => {
        let sum = 0;
        num.split("").forEach((digit) => (sum += parseInt(digit)));
        return sum / num.length;
    };

    while (avg(numToString) < 5) {
        numToString += "9";
    }

    console.log(numToString);
}

// TESTS:
numberModification(101);
numberModification(5835);
