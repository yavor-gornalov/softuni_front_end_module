// https://judge.softuni.org/Contests/Compete/Index/3786#1

function vacation(groupCount, groupType, dayOfWeek) {
    let price;
    let discount = 0;

    if (groupType === "Students") {
        discount = groupCount >= 30 ? 0.15 : 0;
        if (dayOfWeek === "Friday") {
            price = 8.45;
        } else if (dayOfWeek === "Saturday") {
            price = 9.8;
        } else if (dayOfWeek === "Sunday") {
            price = 10.46;
        }
    } else if (groupType === "Business") {
        if (groupCount >= 100) {
            groupCount -= 10;
        }
        if (dayOfWeek === "Friday") {
            price = 10.9;
        } else if (dayOfWeek === "Saturday") {
            price = 15.6;
        } else if (dayOfWeek === "Sunday") {
            price = 16;
        }
    } else if (groupType === "Regular") {
        if (groupCount >= 10 && groupCount <= 20) {
            discount = 0.05;
        }
        if (dayOfWeek === "Friday") {
            price = 15;
        } else if (dayOfWeek === "Saturday") {
            price = 20;
        } else if (dayOfWeek === "Sunday") {
            price = 22.5;
        }
    }

    totalPrice = (1 - discount) * groupCount * price;

    console.log(`Total price: ${totalPrice.toFixed(2)}`);
}

vacation(30, "Students", "Sunday");
vacation(40, "Regular", "Saturday");
