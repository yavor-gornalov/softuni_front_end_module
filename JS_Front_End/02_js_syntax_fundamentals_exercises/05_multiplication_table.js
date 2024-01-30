// https://judge.softuni.org/Contests/Compete/Index/3786#4

function multiplicationTable(number) {
    for (let i = 1; i <= 10; i++) {
        product = number * i;
        console.log(`${number} X ${i} = ${product}`);
    }
}

multiplicationTable(5);
