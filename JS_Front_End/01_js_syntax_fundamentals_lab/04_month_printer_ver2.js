function solve(...args) {
    const [month] = args
    result = "Error!"
    if (1 <= month && month <= 12) {
        const date = new Date(2024, month - 1);
        result = date.toLocaleString('default', { month: 'long' })
    }
    console.log(result)
}

solve(1)