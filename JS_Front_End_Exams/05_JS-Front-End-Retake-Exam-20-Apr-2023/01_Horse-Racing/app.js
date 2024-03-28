function solve(data) {
    const commandsMap = {
        Retake: retake,
        Trouble: trouble,
        Rage: rage,
        Miracle: miracle,
    };
    let horses = [];
    horses = data.shift().split("|");

    for (const line of data) {
        if (line === "Finish") {
            printResults();
            break;
        }

        const [command, ...tokens] = line.split(" ");

        commandsMap[command](...tokens);
    }

    function retake(overtakingHorse, overtakenHorse) {
        let overtakingIdx = horses.indexOf(overtakingHorse);
        let overtakenIdx = horses.indexOf(overtakenHorse);

        if (overtakingIdx >= overtakenIdx) return;

        [horses[overtakingIdx], horses[overtakenIdx]] = [
            horses[overtakenIdx],
            horses[overtakingIdx],
        ];
        return console.log(`${overtakingHorse} retakes ${overtakenHorse}.`);
    }

    function trouble(horseName) {
        let horseIdx = horses.indexOf(horseName);
        // Do not check horseIdx === 0, test 6 - falls!
        if (horseIdx < 1) return;
        [horses[horseIdx - 1], horses[horseIdx]] = [horses[horseIdx], horses[horseIdx - 1]];
        return console.log(`Trouble for ${horseName} - drops one position.`);
    }
    function rage(horseName) {
        for (let i = 0; i < 2; i++) {
            let horseIdx = horses.indexOf(horseName);
            if (horseIdx === horses.length - 1) break;
            [horses[horseIdx], horses[horseIdx + 1]] = [horses[horseIdx + 1], horses[horseIdx]];
            horseIdx = horses.indexOf(horseName);
        }

        return console.log(`${horseName} rages 2 positions ahead.`);
    }
    function miracle() {
        let lastHorse = horses.shift();
        horses.push(lastHorse);

        return console.log(`What a miracle - ${lastHorse} becomes first.`);
    }

    function printResults() {
        let winner = horses[horses.length - 1];
        horses.reverse();
        console.log(horses.reverse().join("->"));
        console.log(`The winner is: ${winner}`);
    }
}

// solve(["Bella|Alexia|Sugar", "Retake Alexia Sugar", "Rage Bella", "Trouble Bella", "Finish"]);
// solve(["Bella|Alexia|Sugar|First", "Trouble Bella", "Finish"]);
// solve(
//     [
//       'Onyx|Domino|Sugar|Fiona',
//       'Trouble Onyx',
//       'Retake Onyx Sugar',
//       'Rage Domino',
//       'Miracle',
//       'Finish'
//     ]
//   )
// solve(['Fancy|Lilly',
// 'Retake Lilly Fancy',
// 'Trouble Lilly',
// 'Trouble Lilly',
// 'Finish',
// 'Rage Lilly'])
