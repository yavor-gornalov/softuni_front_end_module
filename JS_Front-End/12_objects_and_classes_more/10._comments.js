// https://judge.softuni.org/Contests/Practice/Index/3793#9

function websiteComments(commandsArray) {
    let users = [];
    let articles = [];
    let comments = {};

    commandsArray.forEach((element) => {
        if (element.startsWith("user")) {
            let userName = element.replace("user ", "");
            users.push(userName);
        } else if (element.startsWith("article")) {
            let articleName = element.replace("article ", "");
            articles.push(articleName);
        } else {
            let [userArticleData, commentData] = element.split(": ");
            let [userName, articleName] = userArticleData.split(" posts on ");

            if (articles.includes(articleName) && users.includes(userName)) {
                let [commentTitle, commentContent] = commentData.split(", ");
                let newComment = {
                    title: commentTitle,
                    content: commentContent,
                };
                
                if (!comments.hasOwnProperty([articleName])) {
                    comments[articleName] = [];
                }
                comments[articleName].push([userName, newComment]);
            }
        }
    });

    Object.entries(comments)
        .sort((a, b) => b[1].length - a[1].length)
        .forEach(([articleName, commentData]) => {
            console.log(`Comments on ${articleName}`);
            commentData
                .sort((a, b) => a[0].localeCompare(b[0]))
                .forEach(([userName, comment]) => {
                    console.log(
                        `--- From user ${userName}: ${comment.title} - ${comment.content}`
                    );
                });
        });
}

// TESTS:

websiteComments([
    "user aUser123",
    "someUser posts on someArticle: NoTitle, stupidComment",
    "article Books",
    "article Movies",
    "article Shopping",
    "user someUser",
    "user uSeR4",
    "user lastUser",
    "uSeR4 posts on Books: I like books, I do really like them",
    "uSeR4 posts on Books: I like programming books, I do really like them",
    "uSeR4 posts on Movies: I also like movies, I really do",
    "someUser posts on Shopping: title, I go shopping every day",
    "someUser posts on Movies: Like, I also like movies very much",
]);

// Object.entries(comments).sort(function (a, b) {
//     let countA = 0;
//     Object.values(a[1]).forEach((userComments) => {
//         countA += userComments.length;
//     });

//     let countB = 0;
//     Object.values(b[1]).forEach((userComments) => {
//         countB += userComments.length;
//     });

//     return countB - countA;
// });
