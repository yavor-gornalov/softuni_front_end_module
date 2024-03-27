function solve(data) {
    const mapper = {
        Urgent: addUrgentItem,
        Unnecessary: removeUnnecessaryItem,
        Correct: editItemName,
        Rearrange: reorderItem,
    };
    let products = [];
    products = data.shift().split("!");

    let line;
    while ((line = data.shift()) !== "Go Shopping!") {
        const [command, ...items] = line.split(" ");

        mapper[command](...items);
    }

    console.log(products.join(", "));

    function addUrgentItem(item) {
        if (products.includes(item)) return;
        products.unshift(item);
    }

    function removeUnnecessaryItem(item) {
        if (!products.includes(item)) return;
        let itemIdx = products.indexOf(item);
        products.splice(itemIdx, 1);
    }

    function editItemName(item, newName) {
        if (!products.includes(item)) return;
        let itemIdx = products.indexOf(item);
        products[itemIdx] = newName;
    }

    function reorderItem(item) {
        if (!products.includes(item)) return;
        let itemIdx = products.indexOf(item);
        products.splice(itemIdx, 1);
        products.push(item);
    }
}

// solve(["Tomatoes!Potatoes!Bread", "Unnecessary Milk", "Urgent Tomatoes", "Go Shopping!"]);
solve([
    "Milk!Pepper!Salt!Water!Banana",
    "Urgent Salt",
    "Unnecessary Grapes",
    "Correct Pepper Onion",
    "Rearrange Grapes",
    "Correct Tomatoes Potatoes",
    "Go Shopping!",
]);
