function solve(data) {
    const isIndexValid = (idx) => idx >= 0 && idx < destinations.length;
    const commandMap = {
        "Add Stop": (index, string) => {
            index = Number(index);
            if (isIndexValid(index)) {
                destinations = destinations.slice(0, index) + string + destinations.slice(index);
            }
        },
        "Remove Stop": (startIndex, endIndex) => {
            startIndex = Number(startIndex);
            endIndex = Number(endIndex);
            if (isIndexValid(startIndex) && isIndexValid(endIndex)) {
                destinations = destinations.slice(0, startIndex) + destinations.slice(endIndex + 1);
            }
        },
        Switch: (oldString, newString) => {
            destinations = destinations.replace(new RegExp(oldString, "g"), newString);
        },
    };

    let destinations = data.shift();

    let line;
    while ((line = data.shift()) !== "Travel") {
        let [command, ...args] = line.split(":");
        commandMap[command](...args);
        console.log(destinations);
    }
    console.log(`Ready for world tour! Planned stops: ${destinations}`);
}

solve([
    "Hawai::Cyprys-Greece",
    "Add Stop:7:Rome",
    "Remove Stop:11:16",
    "Switch:Hawai:Bulgaria",
    "Travel",
]);

// solve([
//     "Albania:Bulgaria:Cyprus:Deuchland",
//     "Add Stop:3:Nigeria",
//     "Remove Stop:4:8",
//     "Switch:Albania: Azərbaycan",
//     "Travel",
// ]);
