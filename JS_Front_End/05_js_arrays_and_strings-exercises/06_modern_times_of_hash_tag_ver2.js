function solve(str) {
    const re = /\#([a-zA-Z]+)/gm;
    const matches = [...str.matchAll(re)];
    matches.forEach((match) => {
        console.log(match[1]);
    });
}

solve("Nowadays everyone uses # to tag a #special word in #socialMedia");
solve(
    "The symbol # is known #variously in English-speaking #regions as the #number sign"
);
