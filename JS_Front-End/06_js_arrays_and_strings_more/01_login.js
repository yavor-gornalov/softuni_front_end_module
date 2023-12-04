// https://judge.softuni.org/Contests/Practice/Index/4363#0

function login(arguments) {
    [username, ...passwords] = arguments;

    let getDefaultPassword = (username) => {
        let usernameLetters = username.split("");
        usernameLetters = usernameLetters.reverse();
        return usernameLetters.join("");
    };

    let isLogged = (pass, defaultPass) => pass === defaultPass;

    let userPassword = getDefaultPassword(username);
    let isLoggedFlag = false;

    let counter = 0;
    while (passwords.length > 0) {
        let currentPass = passwords.shift();

        if (isLogged(currentPass, userPassword)) {
            isLoggedFlag = true;
            break;
        }

        if (counter == 3) break;

        console.log("Incorrect password. Try again.");
        counter++;
    }

    if (isLoggedFlag) {
        console.log(`User ${username} logged in.`);
    } else {
        console.log(`User ${username} blocked!`);
    }
}

login(["Acer", "login", "go", "let me in", "recA"]);
login(['momo','omom']);
login(["sunny", "rainy", "cloudy", "sunny", "not sunny"]);
