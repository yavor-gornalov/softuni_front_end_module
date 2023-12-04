// https://judge.softuni.org/Contests/Practice/Index/4363#2

function buildPyramid(baseLength, increment) {
    let stoneRequired = 0;
    let marbleRequired = 0;
    let lapisLazuliRequired = 0;
    let goldRequired = 0;

    currentStep = 1;
    while (baseLength > 2) {
        if (currentStep % 5 == 0) {
            lapisLazuliRequired += 4 * (baseLength - 1);
        } else {
            marbleRequired += 4 * (baseLength - 1);
        }

        stoneRequired += (baseLength - 2) ** 2;

        currentStep++;
        baseLength -= 2;
    }

    goldRequired = baseLength ** 2;

    stoneRequired = Math.ceil(stoneRequired * increment);
    marbleRequired = Math.ceil(marbleRequired * increment);
    lapisLazuliRequired = Math.ceil(lapisLazuliRequired * increment);
    goldRequired = Math.ceil(goldRequired * increment);
    let pyramidHeight = Math.floor(currentStep * increment);

    console.log(`Stone required: ${stoneRequired}
Marble required: ${marbleRequired}
Lapis Lazuli required: ${lapisLazuliRequired}
Gold required: ${goldRequired}
Final pyramid height: ${pyramidHeight}`);
}

buildPyramid(11, 1);
buildPyramid(11, 0.75);
buildPyramid(12, 1);
