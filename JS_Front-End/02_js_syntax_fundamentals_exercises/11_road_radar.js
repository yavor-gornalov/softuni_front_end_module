// https://judge.softuni.org/Contests/Compete/Index/3786#10

function roadRadar(drivingSpeed, area) {
  const SPEED_LIMITS = {
    motorway: 130,
    interstate: 90,
    city: 50,
    residential: 20,
  };
  let output;
  let status;
  let currentLimit = SPEED_LIMITS[area];
  if (drivingSpeed > currentLimit) {
    let overSpeed = drivingSpeed - currentLimit;
    let status;
    if (overSpeed <= 20) {
      status = "speeding";
    } else if (overSpeed <= 40) {
      status = "excessive speeding";
    } else {
      status = "reckless driving";
    }
    output = `The speed is ${overSpeed} km/h faster than the allowed speed of ${currentLimit} - ${status}`;
  } else {
    output = `Driving ${drivingSpeed} km/h in a ${currentLimit} zone`;
  }
  console.log(output);
}

roadRadar(40, "city");
roadRadar(21, "residential");
roadRadar(120, "interstate");
roadRadar(200, "motorway");
