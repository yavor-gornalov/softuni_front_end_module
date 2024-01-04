async function attachEvents() {
    try {
        const baseUrl = "http://localhost:3030/jsonstore/collections/students/";
        const tblResults = document.querySelector("table tbody");
        const response = await fetch(baseUrl, { method: "get" });
        const studentData = Object.values(await response.json());
        const [firstNameField, lastNameField, facultyNumberField, gradeField] =
            document.querySelectorAll("div.inputs input");
        const btnSubmit = document.getElementById("submit");

        studentData.forEach((student) => {
            const newRecord = document.createElement("tr");
            newRecord.innerHTML = `<td>${student.firstName}</td>
            <td>${student.lastName}</td>
            <td>${student.facultyNumber}</td>
            <td>${student.grade}</td>`;
            tblResults.appendChild(newRecord);
        });

        btnSubmit.addEventListener("click", async () => {
            const firstName = firstNameField.value;
            const lastName = lastNameField.value;
            const facultyNumber = facultyNumberField.value;
            const grade = gradeField.value;

            if (!firstName || !lastName || !facultyNumber || !grade) return;
            const newStudent = JSON.stringify({
                firstName,
                lastName,
                facultyNumber,
                grade,
            });

            await fetch(baseUrl, { method: "post", body: newStudent });

        });
    } catch (err) {
        console.log(err);
    }
}

attachEvents();
