function solve(data) {
    const MAX_FUEL_CAPACITY = 100;
    const riders = [];
    const mapper = {
        StopForFuel: StopForFuel,
        Overtaking: Overtaking,
        EngineFail: EngineFail,
    };

    const numberOfRiders = data.shift();
    for (let idx = 0; idx < numberOfRiders; idx++) {
        const [riderName, fuelCapacity, position] = data.shift().split("|");

        const newRider = {
            riderName,
            fuelCapacity: Number(fuelCapacity),
            position: Number(position),
        };
        riders.push(newRider);
    }

    let line;
    while ((line = data.shift()) !== "Finish") {
        const [command, ...tokens] = line.split(" - ");

        mapper[command](...tokens);
    }

    riders
        // .sort((x, y) => x.position - y.position)
        .forEach((x) => {
            console.log(`${x.riderName}\n  Final position: ${x.position}`);
        });

    function GetRiderByName(riderName) {
        return riders.find((x) => (x.riderName === riderName));
    }

    function StopForFuel(riderName, minimumFuel, changedPosition) {
        let rider = GetRiderByName(riderName);

        if (rider.fuelCapacity >= minimumFuel) {
            return console.log(`${riderName} does not need to stop for fuel!`);
        }

        rider.fuelCapacity = MAX_FUEL_CAPACITY;
        rider.position = changedPosition;
        return console.log(
            `${riderName} stopped to refuel but lost his position, now he is ${changedPosition}.`
        );
    }

    function Overtaking(firstRiderName, secondRiderName) {
        let firstRider = GetRiderByName(firstRiderName);
        let secondRider = GetRiderByName(secondRiderName);

        if (firstRider.position < secondRider.position) {
            [firstRider.position, secondRider.position] = [secondRider.position, firstRider.position];

            return console.log(`${firstRiderName} overtook ${secondRiderName}!`);
        }
    }

    function EngineFail(riderName, lapsLeft) {
        let indexToRemove = riders.findIndex((r) => r.riderName === riderName);

        riders.splice(indexToRemove, 1);

        return console.log(
            `${riderName} is out of the race because of a technical issue, ${lapsLeft} laps before the finish.`
        );
    }
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
