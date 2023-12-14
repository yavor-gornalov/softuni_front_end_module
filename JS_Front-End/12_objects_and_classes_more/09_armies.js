// https://judge.softuni.org/Contests/Practice/Index/3793#8

function armies(data) {
    let leaderArmies = [];

    class Leader {
        constructor(leaderName) {
            this.leaderName = leaderName;
            this.armies = {};
        }

        addArmy(armyName, armyCount) {
            this.armies[armyName] = armyCount;
        }

        increaseArmyCount(armyName, armyCount) {
            this.armies[armyName] += armyCount;
        }

        info() {
            let result = [`${this.leaderName}: ${this.soldiersCount}`];

            let sortedArmies = Object.entries(this.armies).sort(
                (a, b) => b[1] - a[1]
            );

            sortedArmies.forEach(([army, count]) => {
                result.push(`>>> ${army} - ${count}`);
            });

            return result.join("\n");
        }

        get soldiersCount() {
            let total = 0;
            Object.values(this.armies).forEach((armyCount) => {
                total += armyCount;
            });
            return total;
        }
    }

    data.forEach((el) => {
        if (el.includes("arrives")) {
            let leaderName = el.replace(" arrives", "");
            let newLeader = new Leader(leaderName);
            leaderArmies.push(newLeader);
        } else if (el.includes("defeated")) {
            let leaderName = el.replace(" defeated", "");

            let leaderToRemove = leaderArmies.filter(
                (lead) => lead.leaderName === leaderName
            )[0];

            if (leaderToRemove) {
                let idx = leaderArmies.indexOf(leaderToRemove);
                leaderArmies.splice(idx, 1);
            }
        } else if (el.includes(":")) {
            let [leaderName, armyInfo] = el.split(": ");

            let leader = leaderArmies.filter(
                (lead) => lead.leaderName === leaderName
            )[0];

            if (leader) {
                let [armyName, armyCount] = armyInfo.split(", ");
                leader.addArmy(armyName, Number(armyCount));
            }
        } else if (el.includes("+")) {
            let [armyName, armyCount] = el.split(" + ");

            let leader = leaderArmies.filter((lead) =>
                lead.armies.hasOwnProperty(armyName)
            )[0];

            if (leader) leader.increaseArmyCount(armyName, Number(armyCount));
        }
    });

    let sortedLeaderArmies = leaderArmies.sort(
        (a, b) => b.soldiersCount - a.soldiersCount
    );
    sortedLeaderArmies.forEach((leader) => {
        6;
        console.log(leader.info());
    });
}

// TESTS:

armies([
    "Rick Burr arrives",
    "Fergus: Wexamp, 30245",
    "Rick Burr: Juard, 50000",
    "Findlay arrives",
    "Findlay: Britox, 34540",
    "Wexamp + 6000",
    "Juard + 1350",
    "Britox + 4500",
    "Porter arrives",
    "Porter: Legion, 55000",
    "Legion + 302",
    "Rick Burr defeated",
    "Porter: Retix, 3205",
]);

// armies([
//     "Rick Burr arrives",
//     "Findlay arrives",
//     "Rick Burr: Juard, 1500",
//     "Wexamp arrives",
//     "Findlay: Wexamp, 34540",
//     "Wexamp + 340",
//     "Wexamp: Britox, 1155",
//     "Wexamp: Juard, 43423",
// ]);
