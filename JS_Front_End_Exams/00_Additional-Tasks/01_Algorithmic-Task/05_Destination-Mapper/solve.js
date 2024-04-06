function solve(data) {
    let string = data[0];
    let pattern = /(=|\/)([A-Z][A-Za-z]{2,})(\1)/g;
    let re = new RegExp(pattern);

    let travelPoints = 0;
    let destinations = [];
    for (const match of string.matchAll(re)) {
        let destination = match[2];
        destinations.push(destination);
        travelPoints += destination.length;
    }

    console.log(`Destinations: ${destinations.join(", ")}
Travel Points: ${travelPoints}`);
}

solve(["=Hawai=/Cyprus/=Invalid/invalid==i5valid=/I5valid/=i="]);
solve("ThisIs some InvalidInput");
