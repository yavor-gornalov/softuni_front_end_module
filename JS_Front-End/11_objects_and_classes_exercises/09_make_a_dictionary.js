// https://judge.softuni.org/Contests/Compete/Index/3792#8

function dictionary(data) {
    dict = {};
    for (const json of data) {
        let record = JSON.parse(json);
        let entries = Object.entries(record);
        for (let [term, definition] of entries) {
            dict[term] = definition;
        }
    }

    sortedDict = Object.entries(dict).sort();

    sortedDict.forEach(([term, definition]) => {
        console.log(`Term: ${term} => Definition: ${definition}`);
    });
}

// TESTS:
dictionary([
    '{"Coffee":"A hot drink made from the roasted and ground seeds (coffee beans) of a tropical shrub."}',
    '{"Bus":"A large motor vehicle carrying passengers by road, typically one serving the public on a fixed route and for a fare."}',
    '{"Boiler":"A fuel-burning apparatus or container for heating water."}',
    '{"Tape":"A narrow strip of material, typically used to hold or fasten something."}',
    '{"Microphone":"An instrument for converting sound waves into electrical energy variations which may then be amplified, transmitted, or recorded."}',
]);
