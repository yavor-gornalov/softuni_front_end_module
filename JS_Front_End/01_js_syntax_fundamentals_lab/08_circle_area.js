// https://judge.softuni.org/Contests/Practice/Index/3785#7

function calc_circle_area(radius) {
    let inputType = typeof radius;
    if (inputType === "number") {
        let area = Math.PI * radius ** 2;
        console.log(area.toFixed(2));
    } else {
        console.log(
            `We can not calculate the circle area, because we receive a ${inputType}.`
        );
    }
}

calc_circle_area(2);
calc_circle_area(3.5);
calc_circle_area([1, 2]);
calc_circle_area("some_text");
