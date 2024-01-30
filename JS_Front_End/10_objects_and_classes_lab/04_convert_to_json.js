// https://judge.softuni.org/Contests/Practice/Index/3791#3

function exportPersonToJSON(firstName, lastName, hairColor) {
    let person = {
        name: firstName,
        lastName: lastName,
        hairColor: hairColor,
    };
    console.log(JSON.stringify(person));
}

// TESTS:
exportPersonToJSON("George", "Jones", "Brown");
exportPersonToJSON("Peter", "Smith", "Blond");
