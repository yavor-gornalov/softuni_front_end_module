// https://judge.softuni.org/Contests/Practice/Index/3787#4

function spiceMustFlow(startingYield) {
  let spiceAmount = 0;
  let currentYield = startingYield;
  let days = 0;
  const SPICE_CONSUMPTION = 26;
  while (currentYield >= 100) {
    days += 1;
    spiceAmount += currentYield - SPICE_CONSUMPTION;
    currentYield -= 10;
  }
  spiceAmount = Math.max(0, spiceAmount - SPICE_CONSUMPTION);
  console.log(days);
  console.log(spiceAmount);
}

spiceMustFlow(111);
spiceMustFlow(450);
spiceMustFlow(10);
