// https://judge.softuni.org/Contests/Practice/Index/3793#7

function garageInfo(data) {
    let garageObj = {};
    data.forEach((el) => {
        let [idx, carData] = el.split(" - ");

        if (!garageObj.hasOwnProperty(idx)) {
            garageObj[idx] = [];
        }

        let car = {};
        for (const iterator of carData.split(", ")) {
            let [key, value] = iterator.split(": ");
            car[key] = value;
        }

        garageObj[idx].push(car);
    });

    Object.entries(garageObj).forEach(([idx, cars]) => {
        console.log(`Garage № ${idx}`);
        cars.forEach((car) => {
            let carInfo = [];
            Object.entries(car).forEach(([key, value]) => {
                carInfo.push(`${key} - ${value}`);
            });
            console.log("---", carInfo.join(", "));
        });
    });
}

TESTS: garageInfo([
    "1 - color: blue, fuel type: diesel",
    "1 - color: red, manufacture: Audi",
    "2 - fuel type: petrol",
    "4 - color: dark blue, fuel type: diesel, manufacture: Fiat",
]);

// garageInfo([
//     "1 - color: green, fuel type: petrol",
//     "1 - color: dark red, manufacture: WV",
//     "2 - fuel type: diesel",
//     "3 - color: dark blue, fuel type: petrol",
// ]);
