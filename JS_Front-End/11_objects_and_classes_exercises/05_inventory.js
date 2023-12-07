// https://judge.softuni.org/Contests/Compete/Index/3792#3

function heroRegistry(data) {
    class Hero {
        constructor(heroName, heroLevel, items) {
            this.heroName = heroName;
            this.heroLevel = heroLevel;
            this.items = items;
        }

        info() {
            console.log(`Hero: ${this.heroName}
level => ${this.heroLevel}
items => ${this.items.join(", ")}`);
        }
    }

    let heroes = [];

    for (const heroData of data) {
        let [heroName, heroLevel, itemsString] = heroData.split(" / ");

        let hero = new Hero(
            heroName,
            Number(heroLevel),
            itemsString.split(", ")
        );

        heroes.push(hero);
    }

    let sortedHeroes = heroes.sort((a, b) => a.heroLevel - b.heroLevel);

    sortedHeroes.forEach((hero) => hero.info());
}

// TESTS:
heroRegistry([
    "Isacc / 25 / Apple, GravityGun",
    "Derek / 12 / BarrelVest, DestructionSword",
    "Hes / 1 / Desolator, Sentinel, Antara",
]);
