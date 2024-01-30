// https://judge.softuni.org/Contests/Compete/Index/3789#5

function passwordValidator(password) {
    let validateLength = (pass) => pass.length >= 6 && pass.length <= 10;
    let validateSymbols = (pass) => pass.match(/^[a-zA-Z0-9_]+$/gm) !== null;
    let validateAtLeastTwoDigits = (pass) => {
        matches = pass.match(/\d/gm);
        if (matches !== null) {
            return matches.length >= 2;
        } else {
            return false;
        }
    };

    let result = [];

    if (!validateLength(password))
        result.push("Password must be between 6 and 10 characters");

    if (!validateSymbols(password))
        result.push("Password must consist only of letters and digits");

    if (!validateAtLeastTwoDigits(password))
        result.push("Password must have at least 2 digits");

    if (
        validateSymbols(password) &&
        validateSymbols(password) &&
        validateAtLeastTwoDigits(password)
    )
        result.push("Password is valid");

    console.log(result.join("\n"));
}

passwordValidator("logIn");
passwordValidator("MyPass123");
passwordValidator("Pa$s$s");
