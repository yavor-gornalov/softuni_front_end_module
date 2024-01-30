// https://judge.softuni.org/Contests/Practice/Index/3790#4

function printDNA(num) {
    const DNA = "ATCGTTAGGG";
    let dnaQueue = DNA.split("");

    let isRising = false;
    let cnt = 0;

    for (let i = 0; i < num; i++) {
        firstLetter = dnaQueue.shift();
        secondLetter = dnaQueue.shift();
        dnaQueue.push(firstLetter, secondLetter);

        console.log(`${'*'.repeat(2-cnt)}${firstLetter}${'-'.repeat(2*cnt)}${secondLetter}${'*'.repeat(2-cnt)}`)

        if (i % 2 == 0) isRising = !isRising;

        cnt += isRising ? 1 : -1;
    }
}

// TESTS:
printDNA(4);
printDNA(10);
