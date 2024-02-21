// https://judge.softuni.org/Contests/Compete/Index/3786#8

function solve(...args) {
    const [fruit, weight, price] = args;
    console.log(
        `I need $${((weight * price) / 1000).toFixed(2)} to buy ${(weight / 1000).toFixed(2)} kilograms ${fruit}.`
    );
}

solve("orange", 2500, 1.8);
solve("apple", 1563, 2.35);
