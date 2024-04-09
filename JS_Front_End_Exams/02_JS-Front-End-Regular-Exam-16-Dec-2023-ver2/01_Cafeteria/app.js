function solve(data) {
    const baristasTeam = {}

    const commnadMap = {
        "Prepare": (baristaName, shift, coffeeType) => {
            let barista = baristasTeam[baristaName]
            if (barista.shift === shift && barista.coffeeTypes.includes(coffeeType)) {
                return console.log(`${baristaName} has prepared a ${coffeeType} for you!`)
            }
            return console.log(`${baristaName} is not available to prepare a ${coffeeType}.`)
        },

        "Change Shift": (baristaName, newShift) => {
            let barista = baristasTeam[baristaName]
            barista.shift = newShift
            return console.log(`${baristaName} has updated his shift to: ${barista.shift}`)
        },

        "Learn": (baristaName, newCoffeeType) => {
            let barista = baristasTeam[baristaName]
            if (barista.coffeeTypes.includes(newCoffeeType)) {
                return console.log(`${baristaName} knows how to make ${newCoffeeType}.`)
            }
            barista.coffeeTypes.push(newCoffeeType)
            return console.log(`${baristaName} has learned a new coffee type: ${newCoffeeType}.`);
        }
    }

    const countOfBaristas = data.shift()
    for (let i = 0; i < countOfBaristas; i++) {
        let [baristaName, shift, coffeeTypes] = data.shift().split(" ")
        let baristaProps = {
            shift: shift,
            coffeeTypes: coffeeTypes.split(",")
        }
        baristasTeam[baristaName] = baristaProps
    }
    while(true) {
        let line = data.shift()

        if (line === "Closed") {
            break;
        }

        let [commnad, ...args] = line.split(" / ")

        commnadMap[commnad](...args)
    }

    for (const name in baristasTeam) {
        console.log(`Barista: ${name}, Shift: ${baristasTeam[name].shift}, Drinks: ${baristasTeam[name].coffeeTypes.join(", ")}`)
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
    "Change Shift / Bob / day",
    "Prepare / Carol / day / Cappuccino",
    "Learn / Bob / Mocha",
    "Closed",
]);