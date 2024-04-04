function solve(data) {
    const commandMap = {
        TakeEven: takeEvenIndexes,
        ChangeAll: changeAllOccurrences,
        Reverse: reverseSubstring,
    };

    let message = data.shift();

    for (const line of data) {
        if (line === "Buy") {
            console.log(`The cryptocurrency is: ${message}`);
            return;
        }

        let [command, ...tokens] = line.split("?");
        message = commandMap[command](message, ...tokens);
    }

    function takeEvenIndexes(message) {
        let newMessage = "";
        for (let i = 0; i < message.length; i += 2) {
            newMessage += message[i];
        }
        console.log(newMessage);
        return newMessage;
    }

    function changeAllOccurrences(message, substring, replacement) {
        let newMessage = message;
        while (newMessage.includes(substring)) {
            newMessage = newMessage.replace(substring, replacement);
        }
        console.log(newMessage);
        return newMessage;
    }

    function reverseSubstring(message, substring) {
        let newMessage = message;
        if (!message.includes(substring)) {
            console.log("error");
        } else {
            let reversedSubstring = substring.split("").reverse().join("");
            newMessage = message.replace(substring, "") + reversedSubstring;
            console.log(newMessage);
        }

        return newMessage;
    }
}

solve(["test", "Reverse?o", "Buy"]);

// solve([
//     "z2tdsfndoctsB6z7tjc8ojzdngzhtjsyVjek!snfzsafhscs",
//     "TakeEven",
//     "Reverse?!nzahc",
//     "ChangeAll?m?g",
//     "Reverse?adshk",
//     "ChangeAll?z?i",
//     "Buy",
// ]);

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
