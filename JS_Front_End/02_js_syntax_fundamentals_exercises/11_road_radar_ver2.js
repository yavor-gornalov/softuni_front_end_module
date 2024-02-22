function solve(...args) {
    const speedLimits = {
        motorway: 130,
        interstate: 90,
        city: 50,
        residential: 20,
    };
    const getStatus = (diff) => {
        if (diff <=20) return "speeding"
        if (diff <=40) return "excessive speeding"
        return "reckless driving"
    }
    const [speed, area] = args;
    const difference = speed - speedLimits[area];

    let message = "";
    if (difference <= 0) {
        message = `Driving ${speed} km/h in a ${speedLimits[area]} zone`;
    } else {
        message =  `The speed is ${difference} km/h faster than the allowed speed of ${speedLimits[area]} - ${getStatus(difference)}`
    }
    console.log(message);
}

solve(40, "city");
solve(21, "residential");
solve(120, "interstate");
solve(200, "motorway");
