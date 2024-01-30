// https://judge.softuni.org/Contests/Practice/Index/3787#3

function gladiatorExpenses(
    fightsLost,
    helmetCost,
    swordCost,
    shieldCost,
    armorCost
) {
    let totalCost = 0;
    for (let i = 1; i <= fightsLost; i++) {
        if (i % 2 == 0) totalCost += helmetCost;
        if (i % 3 == 0) totalCost += swordCost;
        if (i % 6 == 0) totalCost += shieldCost;
        if (i % 12 == 0) totalCost += armorCost;
    }
    console.log(`Gladiator expenses: ${totalCost.toFixed(2)} aureus`);
}

gladiatorExpenses(7, 2, 3, 4, 5);
gladiatorExpenses(23, 12.5, 21.5, 40, 200);
