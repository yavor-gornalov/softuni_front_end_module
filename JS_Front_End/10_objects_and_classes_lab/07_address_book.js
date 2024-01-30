// https://judge.softuni.org/Contests/Practice/Index/3791#6

function addressBook(addresses) {
    let book = {};
    for (const iterator of addresses) {
        let [name, address] = iterator.split(":");
        book[name] = address;
    }

    let sortedBook = Object.entries(book).sort();

    sortedBook.forEach(([key, value]) => {
        console.log(`${key} -> ${value}`);
    });
}

// TESTS:
addressBook([
    "Tim:Doe Crossing",
    "Bill:Nelson Place",
    "Peter:Carlyle Ave",
    "Bill:Ornery Rd",
]);
