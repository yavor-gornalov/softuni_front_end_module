function solve(...args) {
    const [name, age, grade] = args;
    console.log(`Name: ${name}, Age: ${age}, Grade: ${grade.toFixed(2)}`)
}

solve('John', 15, 5.54678)