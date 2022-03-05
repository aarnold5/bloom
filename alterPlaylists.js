const fs = require('fs')
const SpotifyWebApi = require('spotify-web-api-node');
const token = "BQCSOYIelH3oNO2oOA-vvtyTROfITsdmr4PS9SpPTAuxZkXVcg5eLDVY3vTxYIOsDk3FtIFIl_PFBgvtyUy-TNM91fjn31yWcR6S9lUMFSsXz1fU9Y3_J_WwP8ArqRx5Jxg-_ipTexswGeCl0Vupuk6J47hFDor6OJfnCNXuF2lbs1ZO8SxvQJatBWMJ8yEI3C79rl99DBgXqIz5YFbV0q5gjxAieHlN5r9w7SktYXif0madFE86VoOqxIxiPW8ToNBSj3q1J4agTw6eMn8LpnNSciGZ1wYAq30NS-2V-RdZLuxGTBEG";

const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(token);

//GET MY PROFILE DATA
function getMyData() {
    (async () => {
        const me = await spotifyApi.getMe();
        // console.log(me.body);
        getUserPlaylists(me.body.id);
    })().catch(e => {
        console.error(e);
    });
}

//GET MY PLAYLISTS
async function getUserPlaylists(userName) {
    const data = await spotifyApi.getUserPlaylists(userName)

    console.log("---------------+++++++++++++++++++++++++")
    let playlists = []

    for (let playlist of data.body.items) {
        console.log(playlist.name + " " + playlist.id)

        let tracks = await getPlaylistTracks(playlist.id, playlist.name);
        // console.log(tracks);

        const tracksJSON = { tracks }
        let data = JSON.stringify(tracksJSON);
        fs.writeFileSync(playlist.name+'.json', data);
    }
}

//GET SONGS FROM PLAYLIST
async function getPlaylistTracks(playlistId, playlistName) {

    const data = await spotifyApi.getPlaylistTracks(playlistId, {
        offset: 1,
        limit: 100,
        fields: 'items'
    })

    // console.log('The playlist contains these tracks', data.body);
    // console.log('The playlist contains these tracks: ', data.body.items[0].track);
    // console.log("'" + playlistName + "'" + ' contains these tracks:');
    let tracks = [];

    for (let track_obj of data.body.items) {
        const track = track_obj.track
        tracks.push(track);
        console.log(track.name + " : " + track.artists[0].name)
    }

    console.log("---------------+++++++++++++++++++++++++")
    return tracks;
}

getMyData();