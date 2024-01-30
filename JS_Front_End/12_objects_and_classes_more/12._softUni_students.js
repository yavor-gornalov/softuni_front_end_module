// https://judge.softuni.org/Contests/Practice/Index/3793#11

function softUniStudents(studentsAndCoursesData) {
    class Course {
        constructor(courseName, capacity) {
            this.courseName = courseName;
            this.capacity = Number(capacity);
            this.students = [];
        }

        get studentsCount() {
            return this.students.length;
        }

        addStudent(newStudent) {
            if (this.studentsCount < this.capacity) {
                this.students.push(newStudent);
            }
        }

        courseInfo() {
            let info = [`${this.courseName}: ${this.capacity - this.studentsCount} places left`];
            this.students
                .sort((a, b) => b.credits - a.credits)
                .forEach((student) => {
                    info.push(student.studentInfo());
                });
            return info.join("\n");
        }
    }

    class Student {
        constructor(username, credits, email) {
            this.username = username;
            this.credits = Number(credits);
            this.email = email;
        }

        studentInfo() {
            return `--- ${this.credits}: ${this.username}, ${this.email}`;
        }
    }

    function findCourseByName(coursesArray, courseName) {
        for (const course of coursesArray) {
            if (course.courseName === courseName) {
                return course;
            }
        }
    }

    let coursesInfo = [];

    studentsAndCoursesData.forEach((line) => {
        if (line.includes(":")) {
            let [courseName, capacity] = line.split(": ");

            let course = findCourseByName(coursesInfo, courseName);

            if (course) {
                course.capacity += Number(capacity);
            } else {
                let newCourse = new Course(courseName, Number(capacity));
                coursesInfo.push(newCourse);
            }
        } else {
            let regex = /(\w+)\[(\d+)\]/gm;
            let array = [...line.matchAll(regex)];
            const username = array[0][1];
            const credits = Number(array[0][2]);

            regex = /with email (.+) joins (.+)/gm;
            array = [...line.matchAll(regex)];
            const email = array[0][1];
            const courseName = array[0][2];

            let course = findCourseByName(coursesInfo, courseName);

            if (course) {
                let newStudent = new Student(username, credits, email);
                course.addStudent(newStudent);
            }
        }
    });

    coursesInfo
        .sort((a, b) => b.studentsCount - a.studentsCount)
        .forEach((course) => {
            console.log(course.courseInfo());
        });
}

// TESTS:
// softUniStudents([
//     "JavaBasics: 2",
//     "user1[25] with email user1@user.com joins C#Basics",
//     "C#Advanced: 3",
//     "JSCore: 4",
//     "user2[30] with email user2@user.com joins C#Basics",
//     "user13[50] with email user13@user.com joins JSCore",
//     "user1[25] with email user1@user.com joins JSCore",
//     "user8[18] with email user8@user.com joins C#Advanced",
//     "user6[85] with email user6@user.com joins JSCore",
//     "JSCore: 2",
//     "user11[3] with email user11@user.com joins JavaBasics",
//     "user45[105] with email user45@user.com joins JSCore",
//     "user007[20] with email user007@user.com joins JSCore",
//     "user700[29] with email user700@user.com joins JSCore",
//     "user900[88] with email user900@user.com joins JSCore",
// ]);

softUniStudents([
    "JavaBasics: 15",
    "user1[26] with email user1@user.com joins JavaBasics",
    "user2[36] with email user11@user.com joins JavaBasics",
    "JavaBasics: 5",
    "C#Advanced: 5",
    "user1[26] with email user1@user.com joins C#Advanced",
    "user2[36] with email user11@user.com joins C#Advanced",
    "user3[6] with email user3@user.com joins C#Advanced",
    "C#Advanced: 1",
    "JSCore: 8",
    "user23[62] with email user23@user.com joins JSCore",
]);
