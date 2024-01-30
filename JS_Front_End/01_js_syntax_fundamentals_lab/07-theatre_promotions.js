// https://judge.softuni.org/Contests/Practice/Index/3785#6

function solve(day_of_week, age) {
    let result;
    if (!["Weekday", "Weekend", "Holiday"].includes || age < 0 || age > 122) {
        console.log("Error!");
    } else {
        if (age <= 18) {
            if (day_of_week === "Weekday") result = 12;
            else if (day_of_week === "Weekend") result = 15;
            else if (day_of_week === "Holiday") result = 5;
        } else if (age <= 64) {
            if (day_of_week === "Weekday") result = 18;
            else if (day_of_week === "Weekend") result = 20;
            else if (day_of_week === "Holiday") result = 12;
        } else {
            if (day_of_week === "Weekday") result = 12;
            else if (day_of_week === "Weekend") result = 15;
            else if (day_of_week === "Holiday") result = 10;
        }
        console.log(`${result}$`);
    }
}

solve("Weekday", -12);
solve("Weekday", 12);
solve("Weekend", 19);
solve("Holiday", 65);
