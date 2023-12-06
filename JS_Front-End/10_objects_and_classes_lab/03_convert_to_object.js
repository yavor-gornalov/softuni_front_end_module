// https://judge.softuni.org/Contests/Practice/Index/3791#2

function converObject(json) {
    let person = JSON.parse(json);

    for (const [key, value] of Object.entries(person)) {
        console.log(`${key}: ${value}`);
    }
}

// TESTS:
converObject('{"name": "George", "age": 40, "town": "Sofia"}');
converObject('{"name": "Peter", "age": 35, "town": "Plovdiv"}');
