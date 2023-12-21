function attachEventsListeners() {
    const TIME_ARRAY = [1, 24, 1440, 86400];
    const mapper = {
        days: TIME_ARRAY,
        hours: TIME_ARRAY.map((num) => num / TIME_ARRAY[1]),
        minutes: TIME_ARRAY.map((num) => num / TIME_ARRAY[2]),
        seconds: TIME_ARRAY.map((num) => num / TIME_ARRAY[3]),
    };

    let buttons = Array.from(document.querySelectorAll("div>input:last-child"));
    let dataFields = Array.from(document.querySelectorAll("div>input:nth-child(2)"));

    buttons.forEach((button) => {
        button.addEventListener("click", convert);
    });

    function convert() {
        const key = this.id.replace("Btn", "");
        const value = Number(document.getElementById(key).value);

        if (!value) return;

        for (let idx = 0; idx < dataFields.length; idx++) {
            const field = dataFields[idx];
            field.value = mapper[key][idx] * value;
        }
    }
}
