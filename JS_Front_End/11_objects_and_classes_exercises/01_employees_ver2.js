// https://judge.softuni.org/Contests/Compete/Index/3792#0

function printEmployeeInfo(data) {
    class Employee {
        constructor(fullName) {
            this.fullFame = fullName;
            this.personalNumber = fullName.length;
        }
        toString() {
            return `Name: ${this.fullFame} -- Personal Number: ${this.personalNumber}`;
        }
    }

    data.forEach((x) => console.log(new Employee(x).toString()));
}

// TESTS:
printEmployeeInfo([
    "Silas Butler",
    "Adnaan Buckley",
    "Juan Peterson",
    "Brendan Villarreal",
]);
