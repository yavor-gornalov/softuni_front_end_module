// https://judge.softuni.org/Contests/Practice/Index/4363#1

function bitcoinMining(goldPerDay) {
    const BITCOIN_PRICE = 11949.16; // gold/gr
    const GOLD_PRICE = 67.51; // BGN/gr

    let day = 1;
    let totalValueOfGold = 0;
    let dayOfFirstBitcoinMined = 0;

    for (let amount of goldPerDay) {
        if (day % 3 == 0) amount = 0.7 * amount;

        totalValueOfGold += amount * GOLD_PRICE;

        if (!dayOfFirstBitcoinMined) {
            if (totalValueOfGold >= BITCOIN_PRICE) dayOfFirstBitcoinMined = day;
        }
        day++;
    }

    let numberOfBitcoins = Math.floor(totalValueOfGold / BITCOIN_PRICE);
    let moneyLeft = totalValueOfGold - numberOfBitcoins * BITCOIN_PRICE;

    console.log(`Bought bitcoins: ${numberOfBitcoins}`);
    if (dayOfFirstBitcoinMined) {
        console.log(
            `Day of the first purchased bitcoin: ${dayOfFirstBitcoinMined}`
        );
    }
    console.log(`Left money: ${moneyLeft.toFixed(2)} lv.`);
}

// bitcoinMining([100, 200, 300]);
// bitcoinMining([50, 100]);
bitcoinMining([3124.15, 504.212, 2511.124]);
