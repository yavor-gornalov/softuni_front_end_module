// https://judge.softuni.org/Contests/Compete/Index/3792#0

function printEmployeeInfo(data) {
    class Employee {
        constructor(fullName) {
            this.fullFame = fullName;
            this.personalNumber = fullName.length;
        }
        info() {
            console.log(
                `Name: ${this.fullFame} -- Personal Number: ${this.personalNumber}`
            );
        }
    }

    let employees = [];

    for (const name of data) {
        let newEmployee = new Employee(name);
        employees.push(newEmployee);
    }

    employees.forEach((employee) => {
        employee.info();
    });
}

// TESTS:
printEmployeeInfo([
    "Silas Butler",
    "Adnaan Buckley",
    "Juan Peterson",
    "Brendan Villarreal",
]);
