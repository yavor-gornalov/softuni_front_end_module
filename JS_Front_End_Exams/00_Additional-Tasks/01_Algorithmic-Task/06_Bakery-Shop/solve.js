function solve(data) {
    let products = {};
    let soldProducts = 0;
    
    const commandsMap = {
        "Receive": (quantity, food) => {
            if (quantity <= 0) {
                return;
            }
            if (!products[food]) {
                products[food] = 0;
            }
            products[food] += quantity;
        },
        "Sell": (quantity, food) => {
            if (!products[food]) {
                return console.log(`You do not have any ${food}.`);
            }
            if (products[food] < quantity) {
                let soldQuantity = products[food];
                delete products[food];
                soldProducts += soldQuantity;
                return console.log(`There aren't enough ${food}. You sold the last ${soldQuantity} of them.`);
            }
            products[food] -= quantity;
            soldProducts += quantity;
            if (products[food] === 0) {
                delete products[food];
            }
            return console.log(`You sold ${quantity} ${food}.`);
        },
    };

    while (true) {
        let line = data.shift();

        if (line === "Complete") break;

        let [command, quantity, food] = line.split(" ");

        if (!commandsMap[command]) continue;

        commandsMap[command](Number(quantity), food);
    }

    for (const product in products) {
        console.log(`${product}: ${products[product]}`);
    }
    console.log(`All sold: ${soldProducts} goods`);
}

// solve(["Receive 105 cookies", "Receive 10 donuts", "Complete", "Sell 15 sdonuts", "Sell 105 scookies", "Complete"]);
solve(["Receive 105 cookies", "Receive 10 donuts", "Sell 10 donuts", "Sell 1 bread", "Complete"]);
// solve(["Receive 10 muffins", "Receive 23 bagels", "Sell 5 muffins", "Sell 10 bagels", "Complete"]);
