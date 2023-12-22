function encodeAndDecodeMessages() {
    const [encodeButton, decodeButton] = Array.from(document.querySelectorAll("div>button"));
    const [messageArea, encodedMessageArea] = Array.from(document.querySelectorAll("div>textarea"));
    let rawMessage = "";
    encodeButton.addEventListener("click", () => {
        rawMessage = messageArea.value;
        let encodedMessage = "";
        for (const idx in rawMessage) {
            let charCode = rawMessage.charCodeAt(idx) + 1;
            encodedMessage += String.fromCharCode(charCode);
        }

        messageArea.value = "";
        encodedMessageArea.value = encodedMessage;
    });

    decodeButton.addEventListener("click", () => {
        encodedMessageArea.value = rawMessage;
    });
}
