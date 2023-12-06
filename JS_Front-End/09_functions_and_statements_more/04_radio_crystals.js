// https://judge.softuni.org/Contests/Practice/Index/3790#3

function radioCrystals(arguments) {
    let [targetThickness, ...crystals] = arguments;

    let operations = {
        Cut: (x) => x * 0.25,
        Lap: (x) => x * 0.8,
        Grind: (x) => x - 20,
        Etch: (x) => x - 2,
    };

    let xRay = (x) => x + 1;

    let washing = (x) => Math.floor(x);

    for (const crystal of crystals) {
        let operationsLog = [`Processing chunk ${crystal} microns`];

        crystalThickness = crystal;

        for (const key in operations) {
            if (Object.hasOwnProperty.call(operations, key)) {
                let reducedThickness = operations[key](crystalThickness);

                let counter = 0;
                while (reducedThickness >= targetThickness - 1) {
                    crystalThickness = reducedThickness;
                    reducedThickness = operations[key](crystalThickness);
                    counter++;
                }

                if (counter) {
                    operationsLog.push(`${key} x${counter}`);
                    crystalThickness = washing(crystalThickness);
                    operationsLog.push("Transporting and washing");
                }

                if (crystalThickness < targetThickness) {
                    crystalThickness = xRay(crystalThickness);
                    operationsLog.push("X-ray x1");
                }
            }
        }

        operationsLog.push(`Finished crystal ${crystalThickness} microns`);
        console.log(operationsLog.join("\n"));
    }
}

// TESTS:
radioCrystals([1375, 50000]);
radioCrystals([1000, 4000, 8100]);
