const baseUrl = "https://restcountries.com/v2/name";

const formElement = document.querySelector(".country-form");
const containerElement = document.querySelector(".content");
formElement.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const country = formData.get("country");

    fetch(`${baseUrl}/${country}`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            showData(data, containerElement);
        })
        .catch((err) => console.log(err))
        .finally(formElement.reset());
});

function showData(data, element) {
    element.textContent = JSON.stringify(data, null, 4);
}
