const logoutUrl = "http://localhost:3030/users/logout";
const logoutBtn = document.getElementById("logoutBtn");

const createForm = document.getElementById("create-form");
const createBtn = createForm.getElementsByTagName("button")[0];
const createFurnitureUrl = "http://localhost:3030/data/furniture";

const furnitureTable = document.querySelector(".table tbody");
const buyBtn = document.querySelector("table+button");
const ordersUrl = "http://localhost:3030/data/orders";

const allOrdersBtn = document.querySelector(".orders button");
const allOrdersUrl = `http://localhost:3030/data/orders?where=_ownerId%3D%22${sessionStorage.getItem("userId")}%22`;

const orderedProductsContainer = document.querySelector(".orders p:first-of-type span");
const ordersPriceContainer = document.querySelector(".orders p:last-of-type span");
orderedProductsContainer.textContent = "Nothing bought yet!";
ordersPriceContainer.textContent = "0 $";

onload = async (e) => {
    furnitureTable.replaceChildren();
    const furnitureData = await getFurnitureData();

    Array.from(furnitureData).forEach((record) => {
        const tableRow = document.createElement("tr");
        tableRow.innerHTML = `  <td>
                                    <img name='img' src="${record.img}">
                                </td>
                                <td>
                                    <p name='name'>${record.name}</p>
                                </td>
                                <td>
                                    <p name='price'>${record.price}</p>
                                </td>
                                <td>
                                    <p name='factor'>${record.factor}</p>
                                </td>
                                <td>
                                    <input name='check' type="checkbox"/>
                                </td>`;
        furnitureTable.appendChild(tableRow);
    });
};

allOrdersBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    let products = [];
    let total = 0;

    try {
        const response = await fetch(allOrdersUrl, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const ordersData = await response.json();

        if (!response.ok) throw Error(response.statusText);

        for (const order of ordersData) {
            console.log(order);
            for (const { name, price, factor } of Object.values(order)) {
                if (name && price && factor) {
                    products.push(name);
                    total += Number(price);
                }
            }
        }

        if (products.length) {
            orderedProductsContainer.textContent = products.join(", ");
            ordersPriceContainer.textContent = `${total.toFixed(0)} $`;
        }
    } catch (err) {
        window.confirm(err);
    }
});

buyBtn.addEventListener("click", async (e) => {
    let newOrder = [];
    for (const row of Array.from(furnitureTable.getElementsByTagName("tr"))) {
        const cells = row.querySelectorAll("[name]");
        const checked = cells[4].checked;

        if (!checked) continue;

        let newProduct = {
            img: cells[0].scr,
            name: cells[1].textContent,
            price: cells[2].textContent,
            factor: cells[3].textContent,
        };

        newOrder.push(newProduct);
        cells[4].checked = false;
    }

    if (!newOrder.length) {
        window.confirm("No products, selected!");
        return;
    }

    try {
        const response = await fetch(ordersUrl, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "X-Authorization": sessionStorage.getItem("accessToken"),
            },
            body: JSON.stringify(newOrder),
        });

        if (!response.ok) throw Error(response.statusText);

        window.confirm("New order, has been sent!");
        location.reload();
    } catch (err) {
        window.confirm(err);
    }
});

logoutBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    try {
        const response = await fetch(logoutUrl, {
            method: "get",
            headers: {
                "X-Authorization": sessionStorage.accessToken,
            },
        });

        if (!response.ok) throw Error(response.statusText);

        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("userId");

        window.confirm("Logging out...");
        location.replace("../index.html");
    } catch (err) {
        window.confirm(err);
    }
});

createBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const createData = new FormData(createForm);
    const name = createData.get("name");
    const price = createData.get("price");
    const factor = createData.get("factor");
    const img = createData.get("img");
    console.log(createData);
    createForm.reset();

    if (!name || !price || !factor || !img) return window.confirm("All fields are required!");

    try {
        const response = await fetch(createFurnitureUrl, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "X-Authorization": sessionStorage.getItem("accessToken"),
            },
            body: JSON.stringify({
                name,
                price,
                factor,
                img,
            }),
        });

        if (!response.ok) throw Error(response.statusText);
        window.confirm(`Furniture ${name} with price ${price}$, created successfully!`);
        location.reload();
    } catch (err) {
        window.confirm(err);
    }
});

async function getFurnitureData() {
    let furnitureData = [];
    try {
        const response = await fetch(createFurnitureUrl, {
            method: "get",
            headers: {
                "Content-Type": "Application/json",
            },
        });
        furnitureData = await response.json();
    } catch (error) {
        console.log(error);
    }
    return furnitureData;
}
