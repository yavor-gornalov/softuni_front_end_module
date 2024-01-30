function attachEvents() {
    const postsUrl = "http://localhost:3030/jsonstore/blog/posts";
    const commentsUrl = "http://localhost:3030/jsonstore/blog/comments";
    const btnLoadPosts = document.getElementById("btnLoadPosts");
    const btnViewPost = document.getElementById("btnViewPost");
    const postsSelectElement = document.getElementById("posts");
    const postTitleElement = document.getElementById("post-title");
    const postBodyElement = document.getElementById("post-body");
    const postCommentsList = document.getElementById("post-comments");

    let allPosts = [];

    btnLoadPosts.addEventListener("click", async () => {
        try {
            const response = await fetch(postsUrl, { method: "get" });
            const postsData = await response.json();
            allPosts = postsData;

            postsSelectElement.replaceChildren();

            Object.entries(allPosts).forEach(([key, content]) => {
                const newOption = document.createElement("option");
                newOption.value = key;
                newOption.textContent = content.title;
                postsSelectElement.appendChild(newOption);
            });
        } catch (err) {
            console.log(err);
        }
    });

    btnViewPost.addEventListener("click", async () => {
        try {
            const post = allPosts[postsSelectElement.value];
            const response = await fetch(commentsUrl, { method: "get" });
            const commentsData = await response.json();

            const postComments = Object.values(commentsData).filter((comment) => comment.postId === post.id);

            postTitleElement.textContent = post.title;
            postBodyElement.textContent = post.body;

            postCommentsList.replaceChildren();
            postComments.forEach((comment) => {
                newListItem = document.createElement("li");
                newListItem.textContent = comment.text;
                postCommentsList.appendChild(newListItem);
4            });
        } catch (err) {
            console.log(err);
        }
    });
}

attachEvents();
