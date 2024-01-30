// https://judge.softuni.org/Contests/Compete/Index/3792#7

function parkingRegistry(records) {
    let registry = [];

    commands = {
        IN: (plate) => {
            if (!registry.includes(plate)) {
                registry.push(plate);
            }
        },
        OUT: (plate) => {
            let idx = registry.indexOf(plate);
            if (idx >= 0) {
                registry.splice(idx, 1);
            }
        },
    };

    for (const record of records) {
        let [status, plate] = record.split(", ");
        commands[status](plate);
    }
    if (registry.length === 0) {
        console.log("Parking Lot is Empty");
    } else {
        sortedRegistry = registry.sort();

        sortedRegistry.forEach((plate) => {
            console.log(plate);
        });
    }
}

// TESTS:
parkingRegistry([
    "IN, CA2844AA",
    "OUT, CA1234TA",
    "OUT, CA2844AA",
    "IN, CA9999TT",
    "IN, CA2866HI",
    "OUT, CA1234TA",
    "IN, CA2844AA",
    "OUT, CA2866HI",
    "IN, CB9876HH",
    "IN, CA2822UU",
]);

parkingRegistry([
    "IN, CA2844AA",
    "IN, CA1234TA",
    "IN, CA1234TA",
    "IN, CA1234TA",
    "OUT, CA2844AA",
    "OUT, CA1234TA",
]);
