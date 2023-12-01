// https://judge.softuni.org/Contests/Compete/Index/3786#0

function ages(age) {
  let result = "out of bounds";
  if (age < 0) {
    //pass
  } else if (age <= 2) {
    result = "baby";
  } else if (age <= 13) {
    result = "child";
  } else if (age <= 19) {
    result = "teenager";
  } else if (age <= 65) {
    result = "adult";
  } else result = "elder";
  console.log(result);
}

ages(-1);
ages(1);
ages(5);
ages(16);
ages(25);
ages(89);
