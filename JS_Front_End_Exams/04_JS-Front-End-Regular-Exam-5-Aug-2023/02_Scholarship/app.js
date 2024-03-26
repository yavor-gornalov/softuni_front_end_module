window.addEventListener("load", solve);

function solve() {
    const studentElement = document.getElementById("student");
    const universityElement = document.getElementById("university");
    const scoreElement = document.getElementById("score");
    const previewList = document.getElementById("preview-list");
    const candidatesList = document.getElementById("candidates-list");
    const nextButton = document.getElementById("next-btn");
    nextButton.addEventListener("click", (e) => {
        e.preventDefault();
        let [student, university, score] = GetInputValues();

        if (!student || !university || !score) {
            return;
        }

        CreateNewRecord(student, university, score);

        ClearInputValues();
        nextButton.disabled = true;
    });

    function GetInputValues() {
        return [studentElement.value, universityElement.value, scoreElement.value];
    }
    function ClearInputValues() {
        studentElement.value = "";
        universityElement.value = "";
        scoreElement.value = "";
    }

    function CreateNewRecord(student, university, score) {
        let listItem = document.createElement("li");
        listItem.classList.add("application");

        let articleItem = document.createElement("article");

        let headerElement = document.createElement("h4");
        headerElement.textContent = student;

        let firstParagraph = document.createElement("p");
        firstParagraph.textContent = `University: ${university}`;

        let secondParagraph = document.createElement("p");
        secondParagraph.textContent = `Score: ${score}`;

        let editBtn = document.createElement("button");
        editBtn.classList.add("action-btn");
        editBtn.classList.add("edit");
        editBtn.textContent = "edit";
        editBtn.addEventListener("click", EditRecord);

        let applyBtn = document.createElement("button");
        applyBtn.classList.add("action-btn");
        applyBtn.classList.add("apply");
        applyBtn.textContent = "apply";
        applyBtn.addEventListener("click", ApplyRecord);

        articleItem.appendChild(headerElement);
        articleItem.appendChild(firstParagraph);
        articleItem.appendChild(secondParagraph);

        listItem.appendChild(articleItem);
        listItem.appendChild(editBtn);
        listItem.appendChild(applyBtn);

        previewList.appendChild(listItem);

        function EditRecord() {
            studentElement.value = student;
            universityElement.value = university;
            scoreElement.value = score;

            listItem.remove();
            nextButton.disabled = false;
        }

        function ApplyRecord(e) {
            previewList.removeChild(listItem);
            listItem.removeChild(editBtn);
            listItem.removeChild(applyBtn);
            candidatesList.appendChild(listItem);
            nextButton.disabled = false;
        }
    }
}
