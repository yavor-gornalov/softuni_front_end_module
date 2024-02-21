function solve(...args) {
    const mapper = {
        "+": (a, b) => a + b,
        "-": (a, b) => a - b,
        "*": (a, b) => a * b,
        "/": (a, b) => a / b,
        "%": (a, b) => a % b,
        "**": (a, b) => a ** b,
    }

    const [first, second, operator] = args
    result = mapper[operator](first, second)
    console.log(result)
}

solve(3, 5.5, '*')