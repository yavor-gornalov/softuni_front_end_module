// https://judge.softuni.org/Contests/Practice/Index/3788#3

function order(product, quantity) {
    const menu = {
        coffee: 1.5,
        water: 1.0,
        coke: 1.4,
        snacks: 2.0,
    };
    totalCost = menu[product] * quantity;
    console.log(`${totalCost.toFixed(2)}`);
}

order("water", 5);
order("coffee", 2);
