function solve(numbers) {
    let result = [];
    let smallest = true;
    numbers.sort((a, b) => a - b);
    while (numbers.length > 0) {
        if (smallest) result.push(numbers.shift());
        else result.push(numbers.pop());
        smallest = !smallest;
    }
    return result;
}

console.log(solve([1, 65, 3, 52, 48, 63, 31, -3, 18, 56]));
