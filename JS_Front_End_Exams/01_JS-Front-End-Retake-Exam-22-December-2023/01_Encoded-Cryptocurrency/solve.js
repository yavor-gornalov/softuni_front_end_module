function solve(arguments) {
    let mapper = {
        TakeEven: (str) => {
            let result = [];
            let even = false;
            for (const char of str) {
                even = !even;
                if (even) result.push(char);
            }
            return result.join("");
        },

        ChangeAll: (str, substr, repl) => {
            while (str.includes(substr)) {
                str = str.replace(substr, repl);
            }
            return str;
        },

        Reverse: (str, substr) => {
            if (!str.includes(substr)) return "error";
            return str.replace(substr, "") + substr.split("").reverse().join("");
        },
    };

    let [string, ...commands] = arguments;

    commands.forEach((command) => {
        const [action, ...arguments] = command.split("?");

        if (action === "Buy") return console.log(`The cryptocurrency is: ${string}`);

        result = mapper[action](string, ...arguments);

        if (result !== "error") string = result;

        console.log(result);
    });
}

solve([
    "z2tdsfndoctsB6z7tjc8ojzdngzhtjsyVjek!snfzsafhscs",
    "TakeEven",
    "Reverse?!nzahc",
    "ChangeAll?m?g",
    "Reverse?adshk",
    "ChangeAll?z?i",
    "Buy",
]);

// solve([
//     "PZDfA2PkAsakhnefZ7aZ",
//     "TakeEven",
//     "TakeEven",
//     "TakeEven",
//     "ChangeAll?Z?X",
//     "ChangeAll?A?R",
//     "Reverse?PRX",
//     "Buy",
// ]);
