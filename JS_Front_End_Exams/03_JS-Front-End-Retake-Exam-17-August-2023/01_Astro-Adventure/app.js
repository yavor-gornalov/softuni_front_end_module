    function solve(data) {
        const mapper = {
            Explore: Explore,
            Refuel: Refuel,
            Breathe: Breathe,
        };

        const astronautsCount = data.shift();
        astronauts = [];

        for (let idx = 0; idx < astronautsCount; idx++) {
            const [name, health, energy] = data.shift().split(" ");
            newAstronaut = {
                name,
                health: parseInt(health),
                energy: parseInt(energy),
            };
            astronauts.push(newAstronaut);
        }

        let line = data.shift();
        while (line !== "End") {
            const [command, astronautName, value] = line.split(" - ");
            const astro = astronauts.find((x) => x.name === astronautName);

            mapper[command](astro, parseInt(value));

            line = data.shift();
        }

        astronauts.forEach((astro) =>
            console.log(
                `Astronaut: ${astro.name}, Oxygen: ${astro.health}, Energy: ${astro.energy}`
            )
        );

        function Explore(astro, energy) {
            if (energy > astro.energy) {
                return console.log(
                    `${astro.name} does not have enough energy to explore!`
                );
            }
            astro.energy -= energy;
            return console.log(
                `${astro.name} has successfully explored a new area and now has ${astro.energy} energy!`
            );
        }

        function Refuel(astro, amount) {
            let refuelAmount = amount;
            if (astro.energy + amount > 200) {
                refuelAmount -= astro.energy + refuelAmount - 200;
            }

            astro.energy += refuelAmount;
            return console.log(
                `${astro.name} refueled their energy by ${refuelAmount}!`
            );
        }

        function Breathe(astro, amount) {
            let refuelAmount = amount;
            if (astro.health + amount > 100) {
                refuelAmount -= astro.health + refuelAmount - 100;
            }

            astro.health += refuelAmount;
            return console.log(
                `${astro.name} took a breath and recovered ${refuelAmount} oxygen!`
            );
        }
    }

solve([
    "4",
    "Alice 60 100",
    "Bob 40 80",
    "Charlie 70 150",
    "Dave 80 180",
    "Explore - Bob - 60",
    "Refuel - Alice - 30",
    "Breathe - Charlie - 50",
    "End",
]);
