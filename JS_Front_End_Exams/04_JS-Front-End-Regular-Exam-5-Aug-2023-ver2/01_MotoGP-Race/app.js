function solve(data) {
    const commandMap = {
        StopForFuel: (name, minimumFuel, changedPosition) => {
            let rider = getRiderByName(riders, name);
            if (rider.fuel < minimumFuel) {
                rider.position = changedPosition;
                return console.log(
                    `${rider.name} stopped to refuel but lost his position, now he is ${rider.position}.`
                );
            }
            rider.fuel = 100;
            return console.log(`${rider.name} does not need to stop for fuel!`);
        },

        Overtaking: (firstName, secondName) => {
            let firstRider = getRiderByName(riders,firstName);
            let secondRider = getRiderByName(riders, secondName);
            if (firstRider.position < secondRider.position) {
                [firstRider.position, secondRider.position] = [secondRider.position, firstRider.position]
                console.log(`${firstName} overtook ${secondName}!`);
            }
        },

        EngineFail: (name, lapsLeft) => {
            let rider = getRiderByName(riders, name)
            let riderIdx = riders.indexOf(rider)
            riders.splice(riderIdx, 1)
            return console.log(`${rider.name} is out of the race because of a technical issue, ${lapsLeft} laps before the finish.`)
        }
    };
    const numberOfRiders = data.shift();

    let riders = [];
    for (let idx = 0; idx < numberOfRiders; idx++) {
        let [name, fuel, position] = data.shift().split("|");
        let newRider = {
            name,
            fuel: Number(fuel),
            position: Number(position),
        };
        riders.push(newRider);
    }

    let line;

    while ((line = data.shift()) !== "Finish") {
        let [command, ...args] = line.split(" - ");

        if (commandMap.hasOwnProperty(command)) {
            commandMap[command](...args);
        }
    }

    function getRiderByName(riders, driverName) {
        return riders.filter((d) => d.name === driverName)[0];
    }

    riders.forEach((rider) => console.log(`${rider.name}\n  Final position: ${rider.position}`));
}

// solve([
//     "3",
//     "Valentino Rossi|100|1",
//     "Marc Marquez|90|2",
//     "Jorge Lorenzo|80|3",
//     "StopForFuel - Valentino Rossi - 50 - 1",
//     "Overtaking - Marc Marquez - Jorge Lorenzo",
//     "EngineFail - Marc Marquez - 10",
//     "Finish",
// ]);

solve([
    "4",
    "Valentino Rossi|100|1",
    "Marc Marquez|90|3",
    "Jorge Lorenzo|80|4",
    "Johann Zarco|80|2",
    "StopForFuel - Johann Zarco - 90 - 5",
    "Overtaking - Marc Marquez - Jorge Lorenzo",
    "EngineFail - Marc Marquez - 10",
    "Finish",
]);