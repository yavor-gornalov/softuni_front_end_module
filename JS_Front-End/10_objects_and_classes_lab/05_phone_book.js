// https://judge.softuni.org/Contests/Practice/Index/3791#4

function phoneBook(contacts) {
    let phoneBook = {};
    for (const contact of contacts) {
        let [name, phone] = contact.split(" ");
        phoneBook[name] = phone;
    }

    for (const [name, phone] of Object.entries(phoneBook)) {
        console.log(`${name} -> ${phone}`);
    }
}

// TESTS:
phoneBook([
    "Tim 0834212554",
    "Peter 0877547887",
    "Bill 0896543112",
    "Tim 0876566344",
]);

phoneBook(["George 0552554", "Peter 087587", "George 0453112", "Bill 0845344"]);
