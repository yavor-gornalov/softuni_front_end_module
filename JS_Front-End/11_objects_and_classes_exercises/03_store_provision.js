// https://judge.softuni.org/Contests/Compete/Index/3792#2

function storeProvision(stockProducts, orderedProducts) {
    let store = {};

    for (let idx = 0; idx < stockProducts.length; idx += 2) {
        let product = stockProducts[idx];
        let quantity = Number(stockProducts[idx + 1]);

        if (!store.hasOwnProperty(product)) store[product] = 0;

        store[product] += quantity;
    }

    for (let idx = 0; idx < orderedProducts.length; idx += 2) {
        let product = orderedProducts[idx];
        let quantity = Number(orderedProducts[idx + 1]);

        if (!store.hasOwnProperty(product)) store[product] = 0;

        store[product] += quantity;
    }

    Object.entries(store).forEach(([product, quantity]) => {
        console.log(`${product} -> ${quantity}`);
    });
}

// TESTS:
storeProvision(
    ['Chips', '5', 'CocaCola', '9', 'Bananas', '14', 'Pasta', '4', 'Beer', '2'],
    ['Flour', '44', 'Oil', '12', 'Pasta', '7', 'Tomatoes', '70', 'Bananas', '30']
);
