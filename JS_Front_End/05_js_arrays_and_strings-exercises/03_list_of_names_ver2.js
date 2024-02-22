function solve(names) {
    names
        .sort((a, b) => a.localeCompare(b))
        .forEach((name, idx) => {
            console.log(`${idx + 1}.${name}`);
        });
}

solve(["John", "Bob", "Christina", "Ema"]);
