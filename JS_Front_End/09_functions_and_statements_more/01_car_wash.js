// https://judge.softuni.org/Contests/Practice/Index/3790#0

function carWash(commands) {
    operations = {
        soap: (x) => x + 10,
        water: (x) => x * 1.2,
        "vacuum cleaner": (x) => x * 1.25,
        mud: (x) => x * 0.9,
    };

    let cleanPercentage = 0;

    for (const command of commands) {
        cleanPercentage = operations[command](cleanPercentage);
    }

    console.log(`The car is ${cleanPercentage.toFixed(2)}% clean.`);
}

// TESTS:
carWash(["soap", "soap", "vacuum cleaner", "mud", "soap", "water"]);
carWash(["soap", "water", "mud", "mud", "water", "mud", "vacuum cleaner"]);
