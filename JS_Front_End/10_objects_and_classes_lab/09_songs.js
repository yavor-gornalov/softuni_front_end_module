// https://judge.softuni.org/Contests/Practice/Index/3791#8

function playListFilter(songData) {
    class Song {
        constructor(type, name, time) {
            this.type = type;
            this.name = name;
            this.time = time;
        }
    }

    let numberOfSongs = songData.shift();
    let typeList = songData.pop();

    let playList = [];

    for (const iterator of songData) {
        let [type, name, time] = iterator.split("_");
        let newSong = new Song(type, name, time);
        playList.push(newSong);
    }

    let filteredSongs = [];
    if (typeList === "all") {
        filteredSongs = playList;
    } else {
        filteredSongs = playList.filter((song) => song.type === typeList);
    }

    filteredSongs.forEach((song) => {
        console.log(song.name);
    });
}

// TESTS:
playListFilter([
    3,
    "favourite_DownTown_3:14",
    "favourite_Kiss_4:16",
    "favourite_Smooth Criminal_4:01",
    "favourite",
]);

playListFilter([
    4,
    "favourite_DownTown_3:14",
    "listenLater_Andalouse_3:24",
    "favourite_In To The Night_3:58",
    "favourite_Live It Up_3:48",
    "listenLater",
]);

playListFilter([
    2, 
    "like_Replay_3:15", 
    "ban_Photoshop_3:48", "all"
]);
