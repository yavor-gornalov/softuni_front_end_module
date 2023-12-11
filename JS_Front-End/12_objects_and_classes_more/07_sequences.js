// https://judge.softuni.org/Contests/Practice/Index/3793#6

function sequences(array) {
    let result = [];
    array.forEach((el) => {
        let seq = JSON.parse(el).sort((a, b) => b - a);
        let seqToStr = JSON.stringify(seq);

        if (!result.includes(seqToStr)) result.push(seqToStr);
    });

    result.sort((a, b) => JSON.parse(a).length - JSON.parse(b).length);

    result.forEach((el) => console.log(el.split(",").join(", ")));
}

// TESTS:
// sequences([
//     "[-3, -2, -1, 0, 1, 2, 3, 4]",
//     "[10, 1, -17, 0, 2, 13, 5, 9]",
//     "[10, 1, -17, 0, 2, 13, 5, 9]",
//     "[4, -3, 3, -2, 2, -1, 1, 0]",
// ]);

sequences([
    "[-3, -2, -1, 0, 1, 2, 3, 4]",
    "[10, 1, -17, 0, 2, 13]",
    "[4, -3, 3, -2, 2, -1, 1, 0]",
]);

// sequences([
//     "[7.14, 7.180, 7.339, 80.099]",
//     "[7.339, 80.0990, 7.140000, 7.18]",
//     "[7.339, 7.180, 7.14, 80.099]",
// ]);
