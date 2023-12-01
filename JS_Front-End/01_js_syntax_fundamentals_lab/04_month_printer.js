// https://judge.softuni.org/Contests/Practice/Index/3785#3

function solve(month_number) {
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let result;
  if (month_number < 1 || month_number > 12) {
    result = "Error!";
  } else {
    result = month[month_number - 1];
  }
  console.log(result);
}

solve(0);
solve(13);
solve(1);
solve(3);
solve(6);
solve(9);
solve(11);
