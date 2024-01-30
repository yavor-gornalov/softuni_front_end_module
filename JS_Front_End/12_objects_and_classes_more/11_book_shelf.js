// https://judge.softuni.org/Contests/Practice/Index/3793#10

function bookShelf(data) {
    let shelves = {};
    let assignedIDs = [];
    data.forEach((line) => {
        if (line.includes("->")) {
            let [id, genre] = line.split(" -> ");
            if (!assignedIDs.includes(id)) {
                assignedIDs.push(id);
                shelves[[id, genre]] = [];
            }
        } else if (line.includes(":")) {
            let [title, _] = line.split(": ");
            let [author, genre] = _.split(", ");

            for (let [shelf, books] of Object.entries(shelves)) {
                if (shelf.split(",")[1] === genre) {
                    books.push([title, author, genre]);
                }
            }
        }
    });

    Object.entries(shelves)
        .sort(([, a], [, b]) => b.length - a.length)
        .forEach(([shelf, books]) => {
            let [id, genre] = shelf.split(",");
            console.log(`${id} ${genre}: ${books.length}`);
            books
                .sort((a, b) => a[0].localeCompare(b[0]))
                .forEach((book) => {
                    console.log(`--> ${book[0]}: ${book[1]}`);
                });
        });
}

// TESTS:
// bookShelf([
//     "1 -> history",
//     "1 -> action",
//     "Death in Time: Criss Bell, mystery",
//     "2 -> mystery",
//     "3 -> sci-fi",
//     "Child of Silver: Bruce Rich, mystery",
//     "Hurting Secrets: Dustin Bolt, action",
//     "Future of Dawn: Aiden Rose, sci-fi",
//     "Lions and Rats: Gabe Roads, history",
//     "2 -> romance",
//     "Effect of the Void: Shay B, romance",
//     "Losing Dreams: Gail Starr, sci-fi",
//     "Name of Earth: Jo Bell, sci-fi",
//     "Pilots of Stone: Brook Jay, history",
// ]);

bookShelf([
    "1 -> mystery",
    "2 -> sci-fi",
    "Child of Silver: Bruce Rich, mystery",
    "Lions and Rats: Gabe Roads, history",
    "Effect of the Void: Shay B, romance",
    "Losing Dreams: Gail Starr, sci-fi",
    "Name of Earth: Jo Bell, sci-fi",
]);
