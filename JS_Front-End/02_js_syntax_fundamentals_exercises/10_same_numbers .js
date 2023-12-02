// https://judge.softuni.org/Contests/Compete/Index/3786#9

function sameNumbers(number) {
  let numAsString = String(number);
  let firstDigit = numAsString[0];
  let sum = parseInt(firstDigit);
  let hasSameDigits = true;
  for (let i = 1; i < numAsString.length; i++) {
    let currentDigit = numAsString[i];
    hasSameDigits = firstDigit === currentDigit ? true : false;
    sum += parseInt(currentDigit);
  }
  console.log(`${hasSameDigits}\n${sum}`);
}

sameNumbers(1234);
sameNumbers(2222222);
