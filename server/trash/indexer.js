class Song {
    //name is lowercase name, id is [int/string] unique to song
    constructor(name, id) {
        this.name = name;
        this.id = id;
    }
}

class IndexerNode {
    constructor(char) {
        this.char = char;
        this.children = {};
        this.songs = [];
    }
    addSong(name, id) {
        this.songs.push(new Song(name, id));
    }
}

class Indexer {
    constructor() {
        this.roots = {};
    }

    //adds song by iterating through tree to find path at which it should be added
    addSong(name, id) {
        curr = this.roots;
        for(let c of name) {
            curr = curr[c];
        }
        curr.addSong(name, id);
    }

    //gets songs in order of matching
    getSongs(substring) {
        results = [];
        curr = this.roots;
        for(let c of substring) {
            for(let s of curr.songs) {
                results.push(s);
            }
            curr = curr[c];
        }
        return results;
    }
}