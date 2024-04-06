function solve (data) {
    const commandsMap = {
        ChangeAll: changesAllOccurrences,
        Insert: inserValueBefore,
        Move: moveFirstLetters
    }
    
    let message = data.shift()
    for (const line of data) {
        if(line==="Decode") {
            console.log(`The decrypted message is: ${message}`);
            break;
        }

        let [command, ...tokens] = line.split("|")

        if(!commandsMap[command]) continue;
        
        message = commandsMap[command](message, ...tokens)
    }

    function changesAllOccurrences(message, substring, replacement) {
        while (message.includes(substring)) {
            message = message.replace(substring, replacement)
        }
        return message
    }

    function inserValueBefore(message, index, value) {
        message = message.slice(0, index) + value + message.slice(index);
        return message
    }

    function moveFirstLetters(message, numberOfLetters) {
        message = message.slice(Number(numberOfLetters)) + message.slice(0, numberOfLetters)
        return message
    }
}

solve(["zzHe", "ChangeAll|z|l", "Insert|2|o", "Move|3", "Decode"]);
solve(["owyouh", "Move|2", "Move|3", "Insert|3|are", "Insert|9|?", "Decode"]);