async function solution() {
    const baseUrl = "http://localhost:3030/jsonstore/advanced/articles/list/";
    const detailsUrl = "http://localhost:3030/jsonstore/advanced/articles/details/";
    const articleList = await getArticleData();
    const mainContent = document.getElementById("main");

    Object.values(articleList).forEach((article) => {
        // TOP LEVEL CONTAINER
        const divAccordion = Object.assign(document.createElement("div"), {
            classList: ["accordion"],
        });
        // SECONDARY LEVEL CONTAINERS
        const divHead = Object.assign(document.createElement("div"), {
            classList: ["head"],
        });
        const divExtra = Object.assign(document.createElement("div"), {
            classList: ["extra"],
        });

        // THIRD LEVEL ELEMENTS
        const titleElement = Object.assign(document.createElement("span"), {
            textContent: article.title,
        });

        const contentElement = document.createElement("p");

        const btnMore = Object.assign(document.createElement("button"), {
            classList: ["button"],
            id: article._id,
            textContent: "More",
        });

        btnMore.addEventListener("click", async () => {
            const fetchNeeded = contentElement.textContent === "";
            if (btnMore.textContent === "More") {
                if (fetchNeeded) {
                    try {
                        const response = await fetch(detailsUrl + article._id, { method: "get" });
                        const articleContent = await response.json();

                        contentElement.textContent = articleContent.content;
                    } catch (err) {
                        console.log(err);
                    }
                }
                divExtra.style.display = "block";
                btnMore.textContent = "Less";
            } else {
                divExtra.style.display = "none";
                btnMore.textContent = "More";
            }
        });

        divHead.appendChild(titleElement);
        divHead.appendChild(btnMore);
        divExtra.appendChild(contentElement);
        divAccordion.appendChild(divHead);
        divAccordion.appendChild(divExtra);
        mainContent.appendChild(divAccordion);
    });

    async function getArticleData() {
        try {
            const response = await fetch(baseUrl, { method: "get" });
            return await response.json();
        } catch (error) {
            return error;
        }
    }
}

solution();
