// https://judge.softuni.org/Contests/Compete/Index/3786#11

function cookingByNumbers(num, ...commands) {
  let result = parseInt(num);
  for (let i = 0; i < commands.length; i++) {
    let command = commands[i];
    switch (command) {
      case "chop": {
        result /= 2;
        break;
      }
      case "dice": {
        result = Math.sqrt(result);
        break;
      }
      case "spice": {
        result += 1;
        break;
      }
      case "bake": {
        result *= 3;
        break;
      }
      case "fillet": {
        result -= 0.2 * result;
      }
    }
    console.log(result);
  }
}

cookingByNumbers('32', 'chop', 'chop', 'chop', 'chop', 'chop');
cookingByNumbers("9", "dice", "spice", "chop", "bake", "fillet");
