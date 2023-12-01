// https://judge.softuni.org/Contests/Compete/Index/3786#5

function sameNumbers(number) {
  let sum = 0;
  while (number) {
    sum += number % 10;
    number = Math.floor(number / 10);
  }
  console.log(sum)
}

sameNumbers(245678);
