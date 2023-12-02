// https://judge.softuni.org/Contests/Compete/Index/3786#11

function cookingByNumbers(num, ...commands) {
    let result = parseInt(num);

    let operationObj = {
        chop: (result) => result / 2,
        dice: (result) => Math.sqrt(result),
        spice: (result) => result + 1,
        bake: (result) => result * 3,
        fillet: (result) => result * 0.8,
    };

    for (let i = 0; i < commands.length; i++) {
        let command = commands[i];
        result = operationObj[command](result);
        console.log(result);
    }
}

cookingByNumbers("32", "chop", "chop", "chop", "chop", "chop");
cookingByNumbers("9", "dice", "spice", "chop", "bake", "fillet");
