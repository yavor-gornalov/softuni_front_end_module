function solve() {
    let shoppingCart = [];

    const products = Array.from(document.getElementsByClassName("product"));
    products.forEach((product) => {
        const productTitle = product.getElementsByClassName("product-title")[0].textContent;
        const productPrice = product.getElementsByClassName("product-line-price")[0].textContent;
        const addButton = product.getElementsByClassName("product-add")[0];

        addButton.addEventListener("click", () => {
            const product = {
                title: productTitle,
                price: Number(productPrice),
            };
            shoppingCart.push(product);
        });
    });

    const checkOut = document.getElementsByClassName("checkout")[0];
    checkOut.addEventListener("click", () => {
        let totalCost = 0;
        let uniqueProducts = [];
        let output = "";
        shoppingCart.forEach((product) => {
            totalCost += product.price;
            if (!uniqueProducts.includes(product.title)) {
                uniqueProducts.push(product.title);
            }
            output += `Added ${product.title} for ${product.price.toFixed(2)} to the cart.\n`;
        });
        output += `You bought ${uniqueProducts.join(", ")} for ${totalCost.toFixed(2)}.`;

        outputElement = document.getElementsByTagName("textarea")[0];
        outputElement.textContent = output;

        const allButtons = Array.from(document.getElementsByTagName("button"));
        allButtons.forEach((button) => {
            button.disabled = true;
        });
    });
}
