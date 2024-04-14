function solve(data) {
    const MAX_HEALTH = 100;
    const MAX_BULLETS = 6;

    const commandMap = {
        FireShot: (heroName, target) => {
            if (heroes[heroName].bullets <= 0) {
                return console.log(
                    `${heroName} doesn't have enough bullets to shoot at ${target}!`
                );
            }
            heroes[heroName].bullets--;
            // CHECK TARGET HP
            return console.log(
                `${heroName} has successfully hit ${target} and now has ${heroes[heroName].bullets} bullets!`
            );
        },

        TakeHit: (heroName, damage, attacker) => {
            damage = Number(damage); // just in case
            if (heroes[heroName].health <= damage) {
                delete heroes[heroName];
                return console.log(`${heroName} was gunned down by ${attacker}!`);
            }
            heroes[heroName].health -= damage;
            return console.log(
                `${heroName} took a hit for ${damage} HP from ${attacker} and now has ${heroes[heroName].health} HP!`
            );
        },

        Reload: (heroName) => {
            if (heroes[heroName].bullets < MAX_BULLETS) {
                let reloadedBullets = MAX_BULLETS - heroes[heroName].bullets;
                heroes[heroName].bullets = MAX_BULLETS;
                return console.log(`${heroName} reloaded ${reloadedBullets} bullets!`);
            }
            return console.log(`${heroName}'s pistol is fully loaded!`);
        },

        PatchUp: (heroName, amount) => {
            amount = Number(amount); // just in case
            if (heroes[heroName].health < MAX_HEALTH) {
                if (heroes[heroName].health + amount > MAX_HEALTH) {
                    amount = heroes[heroName].health + amount - MAX_HEALTH
                }
                heroes[heroName].health += amount;
                return console.log(`${heroName} patched up and recovered ${amount} HP!`);
            }
            return console.log(`${heroName} is in full health!`);
        },
    };

    const numberOfHeroes = data.shift();
    let heroes = {};

    for (let i = 0; i < numberOfHeroes; i++) {
        let [heroName, health, bullets] = data.shift().split(" ");
        // TODO: CHECK IF HERO NAMES ARE UNIQUE
        heroes[heroName] = {
            health: Math.min(health, MAX_HEALTH),
            bullets: Math.min(bullets, MAX_BULLETS),
        };
    }

    while (true) {
        let line = data.shift();

        if (line === "Ride Off Into Sunset") {
            break;
        }

        let [command, ...args] = line.split(" - ");

        if (!commandMap[command]) {
            continue;
        }

        commandMap[command](...args);
    }

    for (const heroName in heroes) {
        console.log(`${heroName}
 HP: ${heroes[heroName].health}
 Bullets: ${heroes[heroName].bullets}`)
    }
}

// solve([
//     "2",
//     "Gus 100 0",
//     "Walt 100 6",
//     "FireShot - Gus - Bandit",
//     "TakeHit - Gus - 100 - Bandit",
//     "Reload - Walt",
//     "Ride Off Into Sunset",
// ]);

solve([
    "2",
    "Jesse 100 4",
    "Walt 100 5",
    "FireShot - Jesse - Bandit",
    "TakeHit - Walt - 30 - Bandit",
    "PatchUp - Walt - 20",
    "Reload - Jesse",
    "Ride Off Into Sunset",
]);
