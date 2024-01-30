// https://judge.softuni.org/Contests/Compete/Index/3789#6

function printMatrix(num) {
    for (i = 0; i < num; i++) {
        let row = [];
        for (j = 0; j < num; j++) {
            row.push(num);
        }
        console.log(row.join(" "));
    }
}

printMatrix(3)
printMatrix(2)