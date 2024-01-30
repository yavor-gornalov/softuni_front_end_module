// https://judge.softuni.org/Contests/Compete/Index/3792#6

function oddOccurrences(string) {
    let occurrences = {};
    for (const el of string.toLowerCase().split(" ")) {
        if (!occurrences.hasOwnProperty(el)) {
            occurrences[el] = 0;
        }

        occurrences[el] += 1;
    }

    let result = [];
    Object.entries(occurrences).forEach(([key, value]) => {
        if (value % 2) result.push(key);
    });

    console.log(result.join(" "));
}

// TESTS:
oddOccurrences("Java C# Php PHP Java PhP 3 C# 3 1 5 C#");
oddOccurrences('Cake IS SWEET is Soft CAKE sweet Food');
