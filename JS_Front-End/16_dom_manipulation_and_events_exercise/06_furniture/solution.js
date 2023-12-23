function solve() {
    const table = document.querySelector(".table>tbody");
    const [generateButton, buyButton] = Array.from(document.querySelectorAll("#exercise>button"));
    const [furnitureListArea, boughtItemsArea] = Array.from(document.querySelectorAll("#exercise>textarea"));

    let allProducts = [];
    generateButton.addEventListener("click", generateData);
    buyButton.addEventListener("click", buySelectedProducts);

    function generateData() {
        const items = JSON.parse(furnitureListArea.value);

        items.forEach((item) => {
            let product = item;
            product["marked"] = false;

            const row = document.createElement("tr");

            const image = document.createElement("td");
            const itemImage = document.createElement("img");
            itemImage.src = item.img;
            image.appendChild(itemImage);

            const name = document.createElement("td");
            const itemName = document.createElement("p");
            itemName.textContent = item.name;
            name.appendChild(itemName);

            const price = document.createElement("td");
            const itemPrice = document.createElement("p");
            itemPrice.textContent = item.price;
            price.appendChild(itemPrice);

            const factor = document.createElement("td");
            const itemFactor = document.createElement("p");
            itemFactor.textContent = item.decFactor;
            factor.appendChild(itemFactor);

            const mark = document.createElement("td");
            const itemMark = document.createElement("input");
            itemMark.type = "checkbox";
            mark.appendChild(itemMark);

            row.appendChild(image);
            row.appendChild(name);
            row.appendChild(price);
            row.appendChild(factor);
            row.appendChild(mark);

            table.appendChild(row);

            allProducts.push(product);
        });
    }

    function buySelectedProducts() {
        let boughtProducts = [];
        let totalPrice = 0;
        let averageFactor = 0;
        let totalBoughtProducts = 0;

        const rows = Array.from(table.children);
        rows.forEach((row) => {
            let isChecked = row.children[4].children[0].checked;
            if (isChecked) {
                let product = row.children[1].children[0].textContent;
                let price = Number(row.children[2].children[0].textContent);
                let factor = Number(row.children[3].children[0].textContent);
                if (!boughtProducts.includes(product)) boughtProducts.push(product);
                totalPrice += price;
                averageFactor += factor;
                totalBoughtProducts += 1;
            }
        });
        averageFactor /= totalBoughtProducts;
        boughtItemsArea.value = `Bought furniture: ${boughtProducts.join(", ")}
Total price: ${totalPrice.toFixed(2)}
Average decoration factor: ${averageFactor}`;
    }
}
// [{"name": "Sofa", "img": "https://res.cloudinary.com/maisonsdumonde/image/upload/q_auto,f_auto/w_200/img/grey-3-seater-sofa-bed-200-13-0-175521_9.jpg", "price": 150, "decFactor": 1.2}, {"name": "Office chair", "img": "https://www.lidl-shop.nl/media/fcf868f9526b38d0b0a43cc2ace72b80.jpeg", "price": 160, "decFactor": 0.5}]
