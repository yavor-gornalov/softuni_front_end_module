function solve (data){
    const productInformation = data[0];
    const pattern = /(#|\|)([A-Za-z\s]+)\1(\d{2}\/\d{2}\/\d{2})\1(\d+)\1/g;
    const re = new RegExp(pattern);

    let products = []
    let totalCalories = 0
    const matches = productInformation.matchAll(re);
    for (const match of matches) {
        let product = match[2]
        let date = match[3]
        let calories = Number(match[4])
        let newProduct = {
            product,
            date,
            calories,
        }
        products.push(newProduct)

        totalCalories += calories
    }

    console.log(`You have food to last you for: ${Math.floor(totalCalories / 2000)} days!`);
    products.forEach((item) =>
        console.log(`Item: ${item.product}, Best before: ${item.date}, Nutrition: ${item.calories}`)
    );

}

// solve([
//     "#Bread#19/03/21#4000#|Invalid|03/03.20||Apples|08/10/20|200||Carrots|06/08/20|500||Not right|6.8.20|5|",
// ]);

solve([
    "$$#@@%^&#Fish#24/12/20#8500#|#Incorrect#19.03.20#450|$5*(@!#Ice Cream#03/10/21#9000#^#@aswe|Milk|05/09/20|2000|",
]);

// solve([
//     "Hello|#Invalid food#19/03/20#450|$5*(@"
// ]);