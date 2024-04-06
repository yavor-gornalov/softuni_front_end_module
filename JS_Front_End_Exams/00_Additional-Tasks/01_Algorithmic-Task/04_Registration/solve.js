function solve (data) {
    const commandsMap = {
        Letters: upperOrLowerTransform,
        Reverse: reverseSubstring,
        Substring: removeSubstring,
        Replace: replaceCharacter,
        IsValid: isUsernameValid,
    }

    let username = data.shift()

    while(true) {
        let line = data.shift()

        if (line === "Registration") break;

        let [command, ...tokens] = line.split(" ")

        if (!commandsMap[command]) continue;

        commandsMap[command](...tokens)
    }

    function upperOrLowerTransform(format) {
        if (format === "Upper") {
            username = username.toUpperCase()
        }
        if (format === "Lower") {
            username = username.toLowerCase()
        }
        return console.log(username)
    }

    function removeSubstring (substring) {
        if (!username.includes(substring)) {
            return console.log(`The username ${username} doesn't contain ${substring}.`)
        }
        username = username.replace(substring, "")
        return console.log(username)
    }

    function isUsernameValid(char) {
        return console.log(
            username.includes(char)
                ? "Valid username."
                : `${char} must be contained in your username.`
        );
    }

    function reverseSubstring(startIndex,endIndex) {
        if (
            startIndex < 0 ||
            startIndex >= username.length ||
            endIndex < 0 ||
            endIndex >= username.length
        ) {
            return;
        }
        [startIndex, endIndex] = [startIndex, endIndex].sort((a, b) => a - b);
    
        return console.log(username.substring(startIndex, Number(endIndex) + 1).split("").reverse().join(""));
    }

    function replaceCharacter (char) {
        while (username.includes(char)){
            username = username.replace(char, "-")
        }
        return console.log(username);
    }
}



// solve(["John", "Letters Lower", "Substring SA", "IsValid @", "Registration"]);
solve(["ThisIsSoftUni", "Reverse 1 3", "Replace S", "Substring hi", "Registration"]);