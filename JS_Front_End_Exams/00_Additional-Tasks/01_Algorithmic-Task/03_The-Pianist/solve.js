function solve(data) {
    const commandMap = {
        Add: addPiece,
        Remove: removePiece,
        ChangeKey: changePieceKey,
    };
    const numberOfPieces = data.shift();
    let pieces = [];

    for (let index = 0; index < numberOfPieces; index++) {
        const [piece, composer, key] = data.shift().split("|");

        pieces.push({
            piece,
            composer,
            key,
        });
    }

    while (true) {
        let line = data.shift();

        if (line === "Stop") break;

        let [command, ...tokens] = line.split("|");

        if (!commandMap[command]) continue;

        commandMap[command](...tokens);
    }

    function addPiece(piece, composer, key) {
        if (pieces.some((x) => x.piece === piece)) {
            return console.log(`${piece} is already in the collection!`);
        }
        pieces.push({
            piece,
            composer,
            key,
        });
        return console.log(`${piece} by ${composer} in ${key} added to the collection!`);
    }

    function removePiece(piece) {
        let indexToRemove = null;
        for (const p of pieces) {
            if (p.piece === piece) {
                indexToRemove = pieces.indexOf(p);
                pieces.splice(indexToRemove, 1);
                return console.log(`Successfully removed ${piece}!`);
            }
        }
        return console.log(`Invalid operation! ${piece} does not exist in the collection.`)
    }

    function changePieceKey(piece, newKey)
    {
        let currentPiece = pieces.filter(p => p.piece === piece)[0]
        if (!currentPiece) {
            return console.log(`Invalid operation! ${piece} does not exist in the collection.`)
        }
        currentPiece.key = newKey
        return console.log(`Changed the key of ${piece} to ${newKey}!`)
    }

    pieces.forEach(item => {
        console.log(`${item.piece} -> Composer: ${item.composer}, Key: ${item.key}`)

    });
}

// solve([
//     "3",
//     "Fur Elise|Beethoven|A Minor",
//     "Moonlight Sonata|Beethoven|C# Minor",
//     "Clair de Lune|Debussy|C# Minor",
//     "Add|Sonata No.2|Chopin|B Minor",
//     "Add|Hungarian Rhapsody No.2|Liszt|C# Minor",
//     "Add|Fur Elise|Beethoven|C# Minor",
//     "Remove|Clair de Lune",
//     "ChangeKey|Moonlight Sonata|C# Major",
//     "Stop",
// ]);

solve([
    '4',
    'Eine kleine Nachtmusik|Mozart|G Major',
    'La Campanella|Liszt|G# Minor',
    'The Marriage of Figaro|Mozart|G Major',
    'Hungarian Dance No.5|Brahms|G Minor',
    'Add|Spring|Vivaldi|E Major',
    'Remove|The Marriage of Figaro',
    'Remove|Turkish March',
    'ChangeKey|Spring|C Major',
    'Add|Nocturne|Chopin|C# Minor',
    'Stop'
  ])