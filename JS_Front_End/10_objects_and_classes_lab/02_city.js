// https://judge.softuni.org/Contests/Practice/Index/3791#1

function printCityInfo(cityObj) {
    let cityEntries = Object.entries(cityObj);
    for (const [key, value] of cityEntries) {
        console.log(`${key} -> ${value}`);
    }
}

// TESTS:
printCityInfo({
    name: "Sofia",
    area: 492,
    population: 1238438,
    country: "Bulgaria",
    postCode: "1000",
});

printCityInfo({
    name: "Plovdiv",
    area: 389,
    population: 1162358,
    country: "Bulgaria",
    postCode: "4000",
});
