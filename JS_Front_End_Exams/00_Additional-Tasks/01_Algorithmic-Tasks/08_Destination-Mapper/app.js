function solve(destinationsString) {
    let destinations = [];
    let travelPoints = 0;
    const pattern = /(=|\/)([A-Z][A-Za-z]{2,})(\1)/g;
    const matches = destinationsString.matchAll(pattern);
    for (const match of matches) {
        let newDestination = match[2];
        travelPoints += newDestination.length;
        destinations.push(newDestination);
    }
    console.log(`Destinations: ${destinations.join(", ")}\nTravel Points: ${travelPoints}`);
}

solve("=Hawai=/Cyprus/=Invalid/invalid==i5valid=/I5valid/=i=")
solve("ThisIs some InvalidInput")
