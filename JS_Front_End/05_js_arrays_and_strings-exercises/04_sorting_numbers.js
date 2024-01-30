// https://judge.softuni.org/Contests/Compete/Index/4360#3

function listOfNames(list) {
    list.sort((a, b) => a - b);
    let result = [];
    while (list.length !==0) {
        let firstElement = list.shift();
        let lastElement = list.pop();
        result.push(firstElement, lastElement);
    }
    return result;
}

console.log(listOfNames([1, 65, 3, 52, 48, 63, 31, -3, 18, 56]));
console.log(listOfNames([6, 5, 4, 3, 2]));
