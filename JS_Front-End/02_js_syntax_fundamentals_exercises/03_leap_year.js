// https://judge.softuni.org/Contests/Compete/Index/3786#2

function isLeap(year) {
    let isLeap = "no";
    if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
        isLeap = "yes";
    }
    console.log(isLeap);
}

isLeap(1984);
isLeap(2003);
isLeap(4);
