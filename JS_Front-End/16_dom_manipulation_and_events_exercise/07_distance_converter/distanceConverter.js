function attachEventsListeners() {
    const UNITS_MAP = {
        // units: meters
        km: 1000,
        m: 1,
        cm: 0.01,
        mm: 0.001,
        mi: 1609.34,
        yrd: 0.9144,
        ft: 0.3048,
        in: 0.0254,
    };

    const convertButton = document.getElementById("convert");
    convertButton.addEventListener("click", () => {
        const inputDistance = Number(document.getElementById("inputDistance").value);
        const inputUnits = document.getElementById("inputUnits").value;
        const outputUnits = document.getElementById("outputUnits").value;
        const outputDistanceElement = document.getElementById("outputDistance");

        const result = (UNITS_MAP[inputUnits] * inputDistance) / UNITS_MAP[outputUnits];
        outputDistanceElement.value = result;
    });
}
