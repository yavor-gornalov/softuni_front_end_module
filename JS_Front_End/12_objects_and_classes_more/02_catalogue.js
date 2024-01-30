// https://judge.softuni.org/Contests/Practice/Index/3793#1

function catalogue(data) {
    let products = {};
    data.forEach((pair) => {
        let [product, price] = pair.split(" : ");
        let index = product.charAt(0);

        let newProduct = [product, Number(price)];

        if (!products.hasOwnProperty(index)) products[index] = [];
        products[index].push(newProduct);
    });

    Object.entries(products)
        .sort()
        .forEach(([index, products]) => {
            console.log(index);
            products
                .sort((a, b) => a[0].localeCompare(b[0]))
                .forEach(([product, price]) => {
                    console.log(`  ${product}: ${price}`);
                });
        });
}

// TESTS:
catalogue([
    "Appricot : 20.4",
    "Fridge : 1500",
    "TV : 1499",
    "Deodorant : 10",
    "Boiler : 300",
    "Apple : 1.25",
    "Anti-Bug Spray : 15",
    "T-Shirt : 10",
]);
