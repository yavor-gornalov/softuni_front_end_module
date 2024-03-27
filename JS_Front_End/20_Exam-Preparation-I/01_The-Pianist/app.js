function solve(data) {
    const numberOfPieces = Number(data.shift());
    const mapper = {
        Add: AddPiece,
        Remove: RemovePiece,
        ChangeKey: ChangePieceKey,
    };

    let pieces = {};

    for (let idx = 0; idx < numberOfPieces; idx++) {
        // {piece}|{composer}|{key} -- input
        // piece {composer: key}
        const [piece, composer, key] = data.shift().split("|");
        if (!pieces[piece]) {
            pieces[piece] = {
                composer,
                key,
            };
        }
    }

    let line;
    while ((line = data.shift()) !== "Stop") {
        const [command, ...tokens] = line.split("|");

        mapper[command](...tokens);
    }

    Object.entries(pieces).forEach(([name, { composer, key }]) => {
        console.log(`${name} -> Composer: ${composer}, Key: ${key}`);
    });

    function AddPiece(piece, composer, key) {
        if (GetPieceByName(piece)) {
            return console.log(`${piece} is already in the collection!`);
        }
        pieces[piece] = {
            composer,
            key,
        };
        return console.log(`${piece} by ${composer} in ${key} added to the collection!`);
    }

    function RemovePiece(name) {
        if (!GetPieceByName(name)) {
            return console.log(`Invalid operation! ${name} does not exist in the collection.`);
        }
        delete pieces[name];
        return console.log(`Successfully removed ${name}!`);
    }

    function ChangePieceKey(name, newKey) {
        if (!GetPieceByName(name)) {
            return console.log(`Invalid operation! ${name} does not exist in the collection.`);
        }

        let piece = GetPieceByName(name);
        piece.key = newKey;
        return console.log(`Changed the key of ${name} to ${newKey}!`);
    }

    // HELPERS
    function GetPieceByName(name) {
        for (const piece in pieces) {
            if (piece === name) {
                return pieces[name];
            }
        }
    }
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
    "4",
    "Eine kleine Nachtmusik|Mozart|G Major",
    "La Campanella|Liszt|G# Minor",
    "The Marriage of Figaro|Mozart|G Major",
    "Hungarian Dance No.5|Brahms|G Minor",
    "Add|Spring|Vivaldi|E Major",
    "Remove|The Marriage of Figaro",
    "Remove|Turkish March",
    "ChangeKey|Spring|C Major",
    "Add|Nocturne|Chopin|C# Minor",
    "Stop",
]);
