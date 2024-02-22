function solve(str) {
    let re = new RegExp("[A-Z][a-z]+|[A-Z]", "gm")
    let matches = str.match(re);
    console.log(matches.join(", "));
}

solve("SplitMeIfYouCanHaHaYouCantOrYouCan");
solve("HoldTheDoor");
solve("ThisIsSoAnnoyingToDo");
