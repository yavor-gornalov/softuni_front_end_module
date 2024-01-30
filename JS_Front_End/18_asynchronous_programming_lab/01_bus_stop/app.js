function getInfo() {
    const baseUrl = "http://localhost:3030/jsonstore/bus/businfo/";
    const stopId = document.getElementById("stopId").value;

    fetchData(baseUrl + stopId);

    async function fetchData(url) {
        const stopNameElement = document.getElementById("stopName");
        const busDataElement = document.getElementById("buses");

        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();

            const stopName = data.name;
            stopNameElement.textContent = stopName;

            const busInfo = Object.entries(data.buses);
            busInfo.forEach(([busId, time]) => {
                // console.log(busNumber, arrivalTime);
                const newBusListItem = document.createElement("li");
                newBusListItem.textContent = `Bus ${busId} arrives in ${time} minutes`;
                busDataElement.appendChild(newBusListItem);
            });

            // console.log(data);
        } catch (err) {
            stopNameElement.textContent = "Error";
        }
    }
}
