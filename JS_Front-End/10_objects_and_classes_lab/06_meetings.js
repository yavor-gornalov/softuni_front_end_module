// https://judge.softuni.org/Contests/Practice/Index/3791#5

function meetingOrganizer(meetings) {
    let organizer = {};
    for (const meeting of meetings) {
        let [day, person] = meeting.split(" ");
        if (organizer.hasOwnProperty(day)) {
            console.log(`Conflict on ${day}!`);
        } else {
            organizer[day] = person;
            console.log(`Scheduled for ${day}`);
        }
    }

    Object.entries(organizer).forEach(([day, person]) =>
        console.log(`${day} -> ${person}`)
    );
}

// TESTS:
meetingOrganizer([
    "Monday Peter",
    "Wednesday Bill",
    "Monday Tim",
    "Friday Tim",
]);

meetingOrganizer([
    "Friday Bob",
    "Saturday Ted",
    "Monday Bill",
    "Monday John",
    "Wednesday George",
]);
