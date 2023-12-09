// https://judge.softuni.org/Contests/Practice/Index/3793#4

function schoolRegistry(studentsGrades) {
    let students = [];
    studentsGrades.forEach((record) => {
        let tokens = record.split(", ");
        let student = {
            name: tokens[0].split(": ").pop(),
            grade: Number(tokens[1].split(": ").pop()),
            score: Number(tokens[2].split(": ").pop()),
        };
        students.push(student);
    });

    let graduatedStudents = students.filter((student) => student.score >= 3);

    graduatedStudents.forEach((student) => (student.grade += 1));

    let studentsByGrades = {};

    graduatedStudents.forEach((student) => {
        let key = student.grade;
        if (!studentsByGrades.hasOwnProperty(key)) {
            studentsByGrades[key] = [];
        }
        studentsByGrades[key].push(student);
    });

    Object.entries(studentsByGrades).forEach(([grade, students]) => {
        let avg = 0;
        let names = [];
        students.forEach((student) => {
            names.push(student.name);
            avg += student.score;
        });

        avg /= students.length;

        console.log(`${grade} Grade
List of students: ${names.join(", ")}
Average annual score from last year: ${avg.toFixed(2)}\n`);
    });
}

// TESTS:
schoolRegistry([
    "Student name: Mark, Grade: 8, Graduated with an average score: 4.75",
    "Student name: Ethan, Grade: 9, Graduated with an average score: 5.66",
    "Student name: George, Grade: 8, Graduated with an average score: 2.83",
    "Student name: Steven, Grade: 10, Graduated with an average score: 4.20",
    "Student name: Joey, Grade: 9, Graduated with an average score: 4.90",
    "Student name: Angus, Grade: 11, Graduated with an average score: 2.90",
    "Student name: Bob, Grade: 11, Graduated with an average score: 5.15",
    "Student name: Daryl, Grade: 8, Graduated with an average score: 5.95",
    "Student name: Bill, Grade: 9, Graduated with an average score: 6.00",
    "Student name: Philip, Grade: 10, Graduated with an average score: 5.05",
    "Student name: Peter, Grade: 11, Graduated with an average score: 4.88",
    "Student name: Gavin, Grade: 10, Graduated with an average score: 4.00",
]);
