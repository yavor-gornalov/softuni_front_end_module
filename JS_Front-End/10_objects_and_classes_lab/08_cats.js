// https://judge.softuni.org/Contests/Practice/Index/3791#7

function cats(catsInfo) {
    class Cat {
        constructor(cat_name, age) {
            this.cat_name = cat_name;
            this.age = age;
        }
        meow() {
            console.log(`${this.cat_name}, age ${this.age} says Meow`);
        }
    }

    for (const info of catsInfo) {
        let [cat_name, age] = info.split(" ");
        current_cat = new Cat(cat_name, age);
        current_cat.meow();
    }
}

// TESTS:
cats(["Mellow 2", "Tom 5"]);
