function solve() {
    const baseUrl = "http://localhost:3030/jsonstore/bus/schedule/";
    const stopNameElement = document.getElementsByClassName("info")[0];
    const departInput = document.getElementById("depart");
    const arriveInput = document.getElementById("arrive");

    let nextStopId = "depot";
    let nextStopName = "";
    function depart() {
        fetch(baseUrl + nextStopId, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                nextStopName = data.name;
                nextStopId = data.next;
                stopNameElement.textContent = `Next stop ${nextStopName}`;
                departInput.disabled = true;
                arriveInput.disabled = false;
            })
            .catch((err) => {
                console.log(err);
                stopNameElement.textContent = "Error";
                departInput.disabled = true;
                arriveInput.disabled = true;
            });
    }

    async function arrive() {
        stopNameElement.textContent = `Arriving at ${nextStopName}`;
        departInput.disabled = false;
        arriveInput.disabled = true;
    }

    return {
        depart,
        arrive,
    };
}

let result = solve();
