// https://judge.softuni.org/Contests/Compete/Index/3786#8

function solve(fruitName, weightInGrams, pricePerKilogram) {
  weight = weightInGrams / 1000;
  let totalPrice = (weight * pricePerKilogram);
    console.log(
    `I need $${totalPrice.toFixed(2)} to buy ${weight.toFixed(2)} kilograms ${fruitName}.`
  );
}

solve("orange", 2500, 1.8);
solve('apple', 1563, 2.35);
