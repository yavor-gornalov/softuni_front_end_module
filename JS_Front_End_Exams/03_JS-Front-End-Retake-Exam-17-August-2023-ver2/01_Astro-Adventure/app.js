function solve(data) {
    const MAX_OXYGEN = 100;
    const MAX_ENERGY = 200;
    const commandMap = {
        Explore: (astroName, neededEnergy) => {
            let astro = astroTeam[astroName];
            if (astro.energyLevel < neededEnergy) {
                return console.log(`${astroName} does not have enough energy to explore!`);
            }
            astro.energyLevel -= neededEnergy;
            return console.log(
                `${astroName} has successfully explored a new area and now has ${astro.energyLevel} energy!`
            );
        },
        Refuel: (astroName, amount) => {
            let astro = astroTeam[astroName];

            if (astro.energyLevel + amount > MAX_ENERGY) {
                amount = MAX_ENERGY - astro.energyLevel;
            }
            astro.energyLevel += amount;
            return console.log(`${astroName} refueled their energy by ${amount}!`);
        },
        Breathe: (astroName, amount) => {
            let astro = astroTeam[astroName];

            if (astro.oxyLevel + amount > MAX_OXYGEN) {
                amount = MAX_OXYGEN - astro.oxyLevel;
            }
            astro.oxyLevel += amount;
            return console.log(`${astroName} took a breath and recovered ${amount} oxygen!`);
        },
    };

    const astroTeam = {};
    const teamSize = data.shift();
    for (let idx = 0; idx < teamSize; idx++) {
        let [astroName, oxyLevel, energyLevel] = data.shift().split(" ");
        astroTeam[astroName] = {
            oxyLevel: Number(oxyLevel),
            energyLevel: Number(energyLevel),
        };
    }

    let line;
    while ((line = data.shift()) !== "End") {
        let [command, astroName, amount] = line.split(" - ");
        commandMap[command](astroName, Number(amount));
    }

    for (const astro in astroTeam) {
        console.log(
            `Astronaut: ${astro}, Oxygen: ${astroTeam[astro].oxyLevel}, Energy: ${astroTeam[astro].energyLevel}`
        );
    }
}

// solve([
//     "3",
//     "John 50 120",
//     "Kate 80 180",
//     "Rob 70 150",
//     "Explore - John - 50",
//     "Refuel - Kate - 30",
//     "Breathe - Rob - 20",
//     "End",
// ]);

solve([
    "4",
    "Alice 60 100",
    "Bob 40 80",
    "Charlie 70 150",
    "Dave 80 180",
    "Explore - Bob - 60",
    "Refuel - Alice - 30",
    "Breathe - Charlie - 50",
    "Refuel - Dave - 40",
    "Explore - Bob - 40",
    "Breathe - Charlie - 30",
    "Explore - Alice - 40",
    "End",
]);
