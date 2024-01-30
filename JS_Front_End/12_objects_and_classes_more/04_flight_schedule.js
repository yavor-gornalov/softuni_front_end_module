// https://judge.softuni.org/Contests/Practice/Index/3793#3

function flightSchedule(array) {
    let terminal = {};

    let [sector, newlyChangedStatuses, checkStatus] = array;

    sector.forEach((entry) => {
        let [sector, destination] = entry.split(" ");
        let flight = {
            Destination: destination,
            Status: "Ready to fly",
        };
        terminal[sector] = flight;
    });

    newlyChangedStatuses.forEach((entry) => {
        let [sector, newStatus] = entry.split(" ");
        if (terminal[sector]) {
            terminal[sector].Status = newStatus;
        }
    });

    Object.entries(terminal).forEach(([sector, info]) => {
        if (info.Status == checkStatus) console.log(info);
    });
}

// TESTS:
// flightSchedule([
//     [
//         "WN269 Delaware",
//         "FL2269 Oregon",
//         "WN498 Las Vegas",
//         "WN3145 Ohio",
//         "WN612 Alabama",
//         "WN4010 New York",
//         "WN1173 California",
//         "DL2120 Texas",
//         "KL5744 Illinois",
//         "WN678 Pennsylvania",
//     ],
//     [
//         "DL2120 Cancelled",
//         "WN612 Cancelled",
//         "WN1173 Cancelled",
//         "SK430 Cancelled",
//     ],
//     ["Cancelled"],
// ]);

flightSchedule([
    [
        "WN269 Delaware",
        "FL2269 Oregon",
        "WN498 Las Vegas",
        "WN3145 Ohio",
        "WN612 Alabama",
        "WN4010 New York",
        "WN1173 California",
        "DL2120 Texas",
        "KL5744 Illinois",
        "WN678 Pennsylvania",
    ],
    [
        "DL2120 Cancelled",
        "WN612 Cancelled",
        "WN1173 Cancelled",
        "SK330 Cancelled",
    ],
    ["Ready to fly"],
]);
