const baseURL = "http://localhost:3030/jsonstore/grocery/";

const productElement = document.getElementById("product");
const countElement = document.getElementById("count");
const priceElement = document.getElementById("price");

const productsContainer = document.getElementById("tbody");

const loadProductsBtn = document.getElementById("load-product");
loadProductsBtn.addEventListener("click", loadProducts);

const addProductBtn = document.getElementById("add-product");
addProductBtn.addEventListener("click", addProduct);

const updateProductBtn = document.getElementById("update-product");
updateProductBtn.addEventListener("click", putProduct);

async function loadProducts(e) {
    e.preventDefault();
    clearProductContainer();
    try {
        const response = await fetch(baseURL, { method: "get" });
        const data = await response.json();
        insertDataIntoTable(data);
        attachEventListeners();
    } catch (error) {
        console.log(error);
    }
}

async function addProduct(e) {
    e.preventDefault();
    const [product, count, price] = getInputFields();

    if (!product || !count || !price) return;

    const newProduct = {
        product,
        count,
        price,
    };

    try {
        await fetch(baseURL, { method: "post", body: JSON.stringify(newProduct) });
        await loadProducts(e);

    } catch (error) {
        console.log(error);
    }
    clearInputFields();

}

async function putProduct(e) {
    e.preventDefault();
    const [product, count, price] = getInputFields();
    const productId = e.target.dataset.productId;

    if (!product || !count || !price) return;

    const editetdProduct = {
        product,
        count,
        price,
        _id: productId,
    };

    try {
        await fetch(baseURL + productId, { method: "put", body: JSON.stringify(editetdProduct) });
        clearInputFields();
        addProductBtn.disabled = "";
        updateProductBtn.disabled = "disabled";
        await loadProducts(e);
    } catch (error) {
        console.log(error);
    }
}

function insertDataIntoTable(data) {
    for (const { product, count, price, _id } of Object.values(data)) {
        const tableRow = document.createElement("tr");

        const nameElement = document.createElement("td")
        nameElement.classList.add("name")
        nameElement.textContent = product
        tableRow.appendChild(nameElement)

        const countElement = document.createElement("td")
        countElement.classList.add("count-product")
        countElement.textContent = count
        tableRow.appendChild(countElement)

        const priceElement = document.createElement("td")
        priceElement.classList.add("product-price")
        priceElement.textContent = price
        tableRow.appendChild(priceElement)

        const btnsContainer  = document.createElement("div")

        const updateBtn = document.createElement("button")
        updateBtn.classList.add("update")
        updateBtn.textContent = "Update"
        updateBtn.dataset.productId = _id
        btnsContainer.appendChild(updateBtn)

        const deleteBtn = document.createElement("button")
        deleteBtn.classList.add("delete")
        deleteBtn.textContent = "Delete"
        deleteBtn.dataset.productId = _id
        btnsContainer.appendChild(deleteBtn)

        tableRow.appendChild(btnsContainer)

        productsContainer.appendChild(tableRow);
    }
}

function attachEventListeners() {
    const deleteBtns = document.querySelectorAll("button.delete");
    deleteBtns.forEach((deleteBtn) => {
        deleteBtn.addEventListener("click", deleteProduct);
    });
    const updateBtns = document.querySelectorAll("button.update");
    updateBtns.forEach((updateBtn) => {
        updateBtn.addEventListener("click", updateProduct);
    });
}

function updateProduct(e) {
    const productRow = e.target.closest("tr");
    const product = productRow.querySelector(".name").textContent;
    const count = productRow.querySelector(".count-product").textContent;
    const price = productRow.querySelector(".product-price").textContent;

    productElement.value = product;
    countElement.value = count;
    priceElement.value = price;

    addProductBtn.disabled = "disabled";
    updateProductBtn.disabled = "";
    updateProductBtn.dataset.productId = e.target.dataset.productId;
}

async function deleteProduct(e) {
    e.preventDefault();
    const productId = e.target.dataset.productId;

    try {
        await fetch(baseURL + productId, { method: "delete" });
        await loadProducts(e);
    } catch (error) {
        console.log(error);
    }
}

// HELPERS
function clearProductContainer() {
    productsContainer.innerHTML = "";
}

function getInputFields() {
    return [productElement.value, countElement.value, priceElement.value];
}

function clearInputFields() {
    productElement.value = "";
    countElement.value = "";
    priceElement.value = "";
}
