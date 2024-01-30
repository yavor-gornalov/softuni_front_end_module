function attachEvents() {
    const locationUrl = "http://localhost:3030/jsonstore/forecaster/locations/";
    const todaysForecastUrl = "http://localhost:3030/jsonstore/forecaster/today/";
    const upcomingForecastUrl = "http://localhost:3030/jsonstore/forecaster/upcoming/";
    const getWeatherElement = document.getElementById("submit");
    const locationElement = document.getElementById("location");
    const forecastElement = document.getElementById("forecast");

    const weatherConditionsMap = {
        Sunny: "&#x2600",
        "Partly sunny": "&#x26C5",
        Overcast: "&#x2601",
        Rain: "&#x2614",
    };

    getWeatherElement.addEventListener("click", async () => {
        let el1 = document.querySelector("div[class='forecasts']");
        if (el1) el1.remove();
        let el2 = document.querySelector("div[class='forecast-info']");
        if (el2) el2.remove();

        try {
            const locationName = locationElement.value;
            const locationResponse = await fetch(locationUrl, { method: "GET" });
            const locationData = Array.from(await locationResponse.json());

            const locationCode = locationData.find((el) => el.name === locationName).code;

            const todaysForecastResponse = await fetch(todaysForecastUrl + locationCode, { method: "GET" });
            const todaysForecastData = await todaysForecastResponse.json();

            const upcomingForecastResponse = await fetch(upcomingForecastUrl + locationCode, { method: "GET" });
            const upcomingForecastData = await upcomingForecastResponse.json();
            console.log(upcomingForecastData);

            const name = todaysForecastData.name;
            const [condition, high, low] = Object.values(todaysForecastData.forecast);

            const currentForecastElement = document.createElement("div");
            currentForecastElement.innerHTML = `<div class="forecasts">
                <span class="condition symbol">${weatherConditionsMap[condition]}</span>
                <span class="condition">
                    <span class="forecast-data">${name}</span>
                    <span class="forecast-data">${low}&#176/${high}&#176</span>
                    <span class="forecast-data">${condition}</span>
                </span>
            </div>`;

            const upcomingForecastElement = document.createElement("div");
            upcomingForecastElement.classList.add("forecast-info");
            upcomingForecastData.forecast.forEach((day) => {
                const [condition_, high_, low_] = Object.values(day);
                const upcomingDayElement = document.createElement("span");
                upcomingDayElement.innerHTML = `<span class="upcoming">
                <span class="symbol">${weatherConditionsMap[condition]}</span>
                <span class="forecast-data">${low_}&#176/${high_}&#176</span>
                <span class="forecast-data">${condition_}</span>
            </span>`;
                upcomingForecastElement.appendChild(upcomingDayElement);
            });

            forecastElement.style.display = "block";
            forecastElement.children[0].appendChild(currentForecastElement);
            forecastElement.children[1].appendChild(upcomingForecastElement);
            locationElement.value = "";
        } catch (err) {
            forecastElement.style.display = "block";
            forecastElement.innerHTML = "<div id='current'>Error</div>";
            console.log("error");
        }
    });
}

attachEvents();
