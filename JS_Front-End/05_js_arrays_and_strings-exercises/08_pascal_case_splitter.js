// https://judge.softuni.org/Contests/Compete/Index/4360#7

function pascalCaseSplitter(string) {
    stringToArr = string.split("")
    let result = stringToArr.shift();

    while (stringToArr.length !== 0) {
        currentChar = stringToArr.shift();
        if (currentChar == currentChar.toUpperCase()) {
            result += `, ${currentChar}`;
        } else {
            result += currentChar;
        }
    }
    console.log(result)
}

function pascalCaseSplitterRegex(string) {
    const regex = /[A-Z][a-z]*/gm
    matches = string.match(regex)
    console.log(matches.join(", "))
}

pascalCaseSplitterRegex("SplitMeIfYouCanHaHaYouCantOrYouCan");
pascalCaseSplitterRegex("HoldTheDoor");
pascalCaseSplitterRegex("ThisIsSoAnnoyingToDo");
