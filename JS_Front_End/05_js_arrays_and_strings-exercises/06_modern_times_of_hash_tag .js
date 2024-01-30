// https://judge.softuni.org/Contests/Compete/Index/4360#5

function hashTag(text) {
    const re = /#[a-zA-Z]+/gm;
    let matches = text.match(re);

    for (const match of matches) {
        console.log(match.slice(1, match.length));
    }
}

hashTag("Nowadays everyone uses # to tag a #special word in #socialMedia");
hashTag(
    "The symbol # is known #variously in English-speaking #regions as the #number sign"
);
