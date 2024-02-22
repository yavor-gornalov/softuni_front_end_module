function solve(arr, step) {
    let result = [];
    let idx = 0;
    while (idx < arr.length) {
        result.push(arr[idx]);
        idx += step;
    }
    console.log(result);
}

solve(["5", "20", "31", "4", "20"], 2);
solve(["dsa", "asd", "test", "tset"], 2);
solve(["1", "2", "3", "4", "5"], 6);
