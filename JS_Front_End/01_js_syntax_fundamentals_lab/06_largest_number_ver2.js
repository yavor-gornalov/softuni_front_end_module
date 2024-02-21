function solve(...args) {
    const result = args.sort((a, b) => b - a)[0]
    console.log(`The largest number is ${result}.`)
}

solve(5, -3, 16)