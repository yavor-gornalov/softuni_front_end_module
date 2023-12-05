// https://judge.softuni.org/Contests/Compete/Index/3789#8

function loadingBar(percent) {
    if (percent === 100) {
        console.log("100% Complete!\n[%%%%%%%%%%]");
    } else {
        console.log(
            `${percent}% [${"%".repeat(percent / 10)}${".".repeat(
                (100 - percent) / 10
            )}]\nStill loading...`
        );
    }
}

loadingBar(30);
loadingBar(50);
loadingBar(100);
