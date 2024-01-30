function attachEvents() {
    const baseUrl = "http://localhost:3030/jsonstore/messenger";
    const authorInput = document.querySelector("input[name='author']");
    const contentInput = document.querySelector("input[name='content']");
    const submitButton = document.getElementById("submit");
    const refreshButton = document.getElementById("refresh");
    const messagesArea = document.getElementById("messages");

    submitButton.addEventListener("click", async () => {
        const author = authorInput.value;
        const content = contentInput.value;

        if (!author || !content) return;

        const newMessage = JSON.stringify({ author, content });

        try {
            await fetch(baseUrl, { method: "post", body: newMessage });
        } catch (err) {
            console.log(err);
        }
    });

    refreshButton.addEventListener("click", async () => {
        try {
            const response = await fetch(baseUrl, { method: "get" });
            const messages = Object.values(await response.json());

            messagesArea.value = messages.map((msg) => `${msg.author}: ${msg.content}`).join("\n");
        } catch (err) {
            console.log(err);
        }
    });
}

attachEvents();
