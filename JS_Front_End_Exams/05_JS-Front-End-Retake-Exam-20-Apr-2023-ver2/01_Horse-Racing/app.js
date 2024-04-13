function solve (data) {
    const commandMap = {
        Retake: (overtakingHorse, overtakenHorse) => {
            let overtakingIdx = horses.indexOf(overtakingHorse);
            let overtakenIdx = horses.indexOf(overtakenHorse);

            if (overtakenIdx === -1 || overtakenIdx === -1 || overtakingIdx < overtakenIdx) {
                return;
            }
            [horses[overtakingIdx], horses[overtakenIdx]] = [
                horses[overtakenIdx],
                horses[overtakingIdx],
            ];
            return console.log(`${overtakingHorse} retakes ${overtakenHorse}.`);
        },

        Trouble: (horseName) => {
            let idx = horses.indexOf(horseName);

            if (idx === -1 || idx === horses.length - 1) return;

            [horses[idx], horses[idx + 1]] = [horses[idx + 1], horses[idx]];

            return console.log(`Trouble for ${horseName} - drops one position.`);
        },

        Rage: (horseName) => {
            let idx = horses.indexOf(horseName);
            for (let i = 0; i < 2; i++) {
                if (idx === 0) break;
                [horses[idx - 1], horses[idx]] = [horses[idx], horses[idx - 1]];
                idx--;
            }
            return console.log(`${horseName} rages 2 positions ahead.`);
        },

        Miracle: () => {
            horses.unshift(horses.pop());
            return console.log(`What a miracle - ${horses[0]} becomes first.`);
        },
    };

    let horses = [] 
    data.shift().split("|").forEach(horse => horses.unshift(horse));
    
    let line;

    while((line = data.shift())!=="Finish"){
        let [command, ...args] = line.split(" ")

        if (!commandMap[command]) continue;

        commandMap[command](...args)
    }
    
    let winner = horses[0]
    console.log(`${horses.reverse().join("->")}\nThe winner is: ${winner}`)

}

// solve(["Bella|Alexia|Sugar", "Retake Alexia Sugar", "Rage Bella", "Trouble Bella", "Finish"]);

// solve([
//     "Onyx|Domino|Sugar|Fiona",
//     "Trouble Onyx",
//     "Retake Onyx Sugar",
//     "Rage Domino",
//     "Miracle",
//     "Finish",
// ]);

// solve([
//     "Fancy|Lilly",
//     "Retake Lilly Fancy",
//     "Trouble Lilly",
//     "Trouble Lilly",
//     "Finish",
//     "Rage Lilly",
// ]);

// solve([
//     "Fourth|Third|Second|First",
//     "Trouble Second",
//     "Trouble Fourth", 
//     "Finish"
// ])

solve([
    "First",
    "Retake First Second",
    "Finish"
])