function solve(data) {
    const commandMap = {
        Rate: (plant, rating) => exhibition[plant].ratings.push(Number(rating)),
        Update: (plant, newRarity) => (exhibition[plant].rarity = newRarity),
        Reset: (plant) => (exhibition[plant].ratings = []),
    };
    let exhibition = {};

    // FILL EXHIBITION DATA
    const numberOfPlants = data.shift();
    for (let i = 0; i < numberOfPlants; i++) {
        let [plant, rarity] = data.shift().split("<->");
        if (!exhibition[plant]) {
            exhibition[plant] = {
                rarity,
                ratings: [],
            };
        }
        exhibition[plant].rarity = rarity;
    }

    // EXECUTE COMMANDS TO MODIFY DATA
    let line;
    while ((line = data.shift()) !== "Exhibition") {
        let [command, argsStr] = line.split(": ");
        let [plant, ...args] = argsStr.split(" - ");

        if (!commandMap[command]) {
            continue;
        }

        if (!exhibition[plant]) {
            console.log("error");
            continue;
        }

        commandMap[command](plant, ...args);
    }

    // PRINT FINAL DATA
    console.log("Plants for the exhibition:");
    for (const plant in exhibition) {
        console.log(
            `- ${plant}; ` +
                `Rarity: ${exhibition[plant].rarity}; ` +
                `Rating: ${getAverageRating(exhibition[plant].ratings).toFixed(2)}`
        );
    }

    function getAverageRating(arr) {
        if (!arr.length) return 0;
        return arr.reduce((sum, val) => sum + val, 0) / arr.length;
    }
}

// solve([
//     "3",
//     "Arnoldii<->4",
//     "Woodii<->7",
//     "Welwitschia<->2",
//     "Rate: Woodii - 10",
//     "Rate: Welwitschia - 7",
//     "Rate: Arnoldii - 3",
//     "Rate: Woodii - 5",
//     "Update: Woodii - 5",
//     "Reset: Arnoldii",
//     "Exhibition",
// ]);

solve([
    "2",
    "Candelabra<->10",
    "Oahu<->10",
    "Rate: Oahu - 7",
    "Rate: Candelabra - 6",
    "Exhibition",
]);
