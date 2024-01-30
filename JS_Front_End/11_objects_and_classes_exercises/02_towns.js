// https://judge.softuni.org/Contests/Compete/Index/3792#1

function printTownPosition(data) {
    class Town {
        constructor(town, latitude, longitude) {
            this.town = town;
            this.latitude = latitude;
            this.longitude = longitude;
        }

        info() {
            console.log(
                `{ town: '${this.town}', latitude: '${this.latitude.toFixed(2)}', longitude: '${this.longitude.toFixed(2)}' }`
            );
        }
    }

    let towns = [];

    for (const iterator of data) {
        let [town, latitude, longitude] = iterator.split(" | ");
        let newTown = new Town(
            town,
            parseFloat(latitude),
            parseFloat(longitude)
        );
        towns.push(newTown);
    }

    towns.forEach((town) => {
        town.info();
    });
}

// TEST:
printTownPosition([
    "Sofia | 42.696552 | 23.32601",
    "Beijing | 39.913818 | 116.363625",
]);
