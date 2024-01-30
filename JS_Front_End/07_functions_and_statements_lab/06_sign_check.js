// https://judge.softuni.org/Contests/Practice/Index/3788#5

function signCheck(numOne, numTwo, numThree) {
    console.log(numOne * numTwo * numThree < 0 ? "Negative" : "Positive");
}

signCheck(5, 12, -15);
signCheck(-6, -12, 14);
signCheck(-1, -2, -3);
signCheck(-5, 1, 1);
