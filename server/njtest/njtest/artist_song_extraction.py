#Gets features of top 10 songs for the top 1000 artists
import os
import spotipy
import csv
from spotipy.oauth2 import SpotifyClientCredentials
from spotipy.oauth2 import SpotifyOAuth
import spotipy.util as util

def create_data():

    dir_path = os.path.dirname(os.path.realpath(__file__))
    id = open(dir_path + '/client_id.txt','r').read()
    secret = open(dir_path + '/client_secret.txt','r').read()

    auth_manager = SpotifyClientCredentials(client_id=id, client_secret=secret)
    sp = spotipy.Spotify(auth_manager=auth_manager)
    token = util.prompt_for_user_token("user-library-read", client_id= id, client_secret=secret, redirect_uri='http://localhost:8881/')
    sp = spotipy.Spotify(auth=token, requests_timeout=10, retries=10)

    #Extracts lists of artists
    dir_path = os.path.dirname(os.path.realpath(__file__))
    artist_idfile = open(dir_path + "/artists_to_ids.txt", "r")
    artistlines = artist_idfile.readlines()
    output_file = open(dir_path + "/test2.csv", "w")
    writer = csv.writer(output_file)

    artist_list = []
    keys = None
    for line in artistlines:
        try:
            artist_id = line.split(": ")[1][:-1]
            artist_list.append(artist_id)
            tracks = sp.artist_top_tracks(artist_id)['tracks']
            for track in tracks:
                if track is not None:
                    features = sp.audio_features(track['id'])[0]
                    if features is not None:
                        features['popularity'] = track['popularity']
                        features['explicit'] = int(track['explicit'])
                        features['genre'] = sp.album(track['album']['id'])['genres']
                        for artist in range(0,len(track['artists'])-1):
                            artist_i = sp.artist(track['artists'][artist]['id'])
                            features['genre'] = features['genre'] + artist_i['genres']
                        if keys is None:
                            keys = list(features.keys())
                            writer.writerow(keys)
                        writer.writerow(features.values())
        except spotipy.client.SpotifyException:
            # reauthenticate the token
            token = util.prompt_for_user_token("user-library-read", client_id= id, client_secret=secret, redirect_uri='http://localhost:8881/')
            sp = spotipy.Spotify(auth=token, requests_timeout=10, retries=10)
            artist_id = line.split(": ")[1][:-1]
            artist_list.append(artist_id)
            tracks = sp.artist_top_tracks(artist_id)['tracks']
            for track in tracks:
                if track is not None:
                    features = sp.audio_features(track['id'])[0]
                    if features is not None:
                        features['popularity'] = track['popularity']
                        features['explicit'] = int(track['explicit'])
                        features['genre'] = sp.album(track['album']['id'])['genres']
                        for artist in range(0,len(track['artists'])-1):
                            artist_i = sp.artist(track['artists'][artist]['id'])
                            features['genre'] = features['genre'] + artist_i['genres']
                        if keys is None:
                            keys = list(features.keys())
                            writer.writerow(keys)
                        writer.writerow(features.values())
    output_file.close()
    print("Done generating output!")

create_data()