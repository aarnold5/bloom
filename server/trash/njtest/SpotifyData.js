


var clientId = 'd45e1813a6564588837b5f187309b617';
var clientSecret = 'e8b50e2ea99b494a9f9b22aae45f0302';
var redirectUri = 'http://localhost:8888'
var song_IDs = []
var id_to_data = {}

var SpotifyWebApi = require('spotify-web-api-node');

// credentials are optional
var spotifyApi = new SpotifyWebApi({
    clientId: clientId,
    clientSecret: clientSecret,
    redirectUri: redirectUri,

});


/* Call this method to run the program. Reactive programming is icky in that you can't save the access token outside the
function to a var to use it later in other functions. Because of this, the access token is retrieved before any other
calls to helper functions that made within the body of getAccessToken(). I will label all helper functions.
 */
function getAccessToken(){
    spotifyApi.clientCredentialsGrant().then(
        function (data) {
            console.log('The access token expires in ' + data.body['expires_in']);
            console.log('The access token is ' + data.body['access_token']);

            // Save the access token so that it's used in future calls
            spotifyApi.setAccessToken(data.body['access_token'])
            console.log(data.body['access_token'])
            //Place all helper functions below this call to receive the access token.
            findSongID('Schism', 'Tool')
            findSongID('YMCA', 'The Village People')

        },
        function (err) {
            console.log('Something went wrong when retrieving an access token', err);
        }
    );
}


function findSongID(track, artist) {
// Search tracks whose name, album or artist contains 'Love'

    spotifyApi.searchTracks('track:' + track + ' artist:' + artist)
        .then(function (data) {
            //console.log('Searching for ' + track, data.body);
            //console.log(data.body['tracks']['items'][0]['id']);
            var id = data.body['tracks']['items'][0]['id'] //song id for pulling metadata.
            song_IDs.push(id);

            for (let id in song_IDs) {
                console.log(song_IDs[id]);
                findMetaData(song_IDs[id])
            }

        }, function (err) {
            console.error(err);
        });
}

function findMetaData(id) {
    spotifyApi.getAudioFeaturesForTrack(id)
        .then(function (data) {
            console.log(data.body);
        }, function (err) {
            done(err);
        });
}

getAccessToken()
