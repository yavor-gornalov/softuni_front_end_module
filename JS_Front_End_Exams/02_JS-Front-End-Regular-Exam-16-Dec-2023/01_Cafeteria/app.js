function solve(arguments) {
    const team = {};
    const teamSize = arguments.shift();
    const mapper = {
        Prepare: (args) => {
            const [barista, shift, coffeeType] = args;

            if (team[barista].shift !== shift || !team[barista].coffeeTypes.includes(coffeeType)) {
                console.log(`${barista} is not available to prepare a ${coffeeType}.`);
            } else {
                console.log(`${barista} has prepared a ${coffeeType} for you!`);
            }
        },
        "Change Shift": (args) => {
            const [barista, newShift] = args;
            team[barista].shift = newShift;
            console.log(`${barista} has updated his shift to: ${newShift}`);
        },
        Learn: (args) => {
            const [barista, newCoffeeType] = args;
            if (!team[barista].coffeeTypes.includes(newCoffeeType)) {
                team[barista].coffeeTypes.push(newCoffeeType);
                console.log(`${barista} has learned a new coffee type: ${newCoffeeType}.`);
            } else {
                console.log(`${barista} knows how to make ${newCoffeeType}.`);
            }
        },
    };

    for (let i = 0; i < teamSize; i++) {
        const line = arguments.shift();
        const [barista, shift, coffeeTypes] = line.split(" ");
        team[barista] = {
            shift: shift,
            coffeeTypes: coffeeTypes.split(","),
        };
    }

    for (const line of arguments) {
        const [command, ...tokens] = line.split(" / ");

        if (command === "Closed") {
            printResult(team);
            break;
        }

        mapper[command](tokens);
    }

    function printResult(team) {
        Object.entries(team).forEach((barista) => {
            console.log(
                `Barista: ${barista[0]}, Shift: ${barista[1].shift}, Drinks: ${barista[1].coffeeTypes.join(", ")}`
            );
        });
    }
}

// solve([
//     "3",
//     "Alice day Espresso,Cappuccino",
//     "Bob night Latte,Mocha",
//     "Carol day Americano,Mocha",
//     "Prepare / Alice / day / Espresso",
//     "Change Shift / Bob / night",
//     "Learn / Carol / Latte",
//     "Learn / Bob / Latte",
//     "Prepare / Bob / night / Latte",
//     "Closed",
// ]);

solve([
    "4",
    "Alice day Espresso,Cappuccino",
    "Bob night Latte,Mocha",
    "Carol day Americano,Mocha",
    "David night Espresso",
    "Prepare / Alice / day / Espresso",
    "Change Shift / Bob / day",
    "Learn / Carol / Latte",
    "Prepare / Bob / night / Latte",
    "Learn / David / Cappuccino",
    "Prepare / Carol / day / Cappuccino",
    "Change Shift / Alice / night",
    "Learn / Bob / Mocha",
    "Prepare / David / night / Espresso",
    "Closed",
]);
