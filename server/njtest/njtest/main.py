import pandas as pd
import numpy as np

#import os

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics import pairwise_distances
import sklearn.metrics.pairwise as pw
from sklearn.preprocessing import MinMaxScaler

import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

from flask import request, escape
import functions_framework
import json

#import spotipy
#from spotipy.oauth2 import SpotifyClientCredentials
#from spotipy.oauth2 import SpotifyOAuth
#import spotipy.util as util

#import warnings
#warnings.filterwarnings("ignore")

#simple function to create OHE features
def ohe_prep(df, column, new_name): 
    """ 
    Create One Hot Encoded features of a specific column

    Parameters: 
        df (pandas dataframe): Spotify Dataframe
        column (str): Column to be processed
        new_name (str): new column name to be used
        
    Returns: 
        tf_df: One hot encoded features 
    """
    
    tf_df = pd.get_dummies(df[column])
    feature_names = tf_df.columns
    tf_df.columns = [new_name + "|" + str(i) for i in feature_names]
    tf_df.reset_index(drop = True, inplace = True)    
    return tf_df

#function to build entire feature set
def create_feature_set(df, float_cols):
    """ 
    Process spotify df to create a final set of features that will be used to generate recommendations

    Parameters: 
        df (pandas dataframe): Spotify Dataframe
        float_cols (list(str)): List of float columns that will be scaled 
        
    Returns: 
        final: final set of features 
    """
    
    #tfidf genre lists
    #tfidf = TfidfVectorizer()
    #tfidf_matrix =  tfidf.fit_transform(df['genre'].apply(lambda x: "".join(x)))
    #genre_df = pd.DataFrame(tfidf_matrix.toarray())
    #genre_df.columns = ['genre' + "|" + i for i in tfidf.get_feature_names()]
    #genre_df.reset_index(drop = True, inplace=True)

    #explicity_ohe = ohe_prep(df, 'explicit','exp') * 1.2
    popularity_ohe = ohe_prep(df, 'popularity_red','pop') * 0.2
    mode_ohe = ohe_prep(df, 'mode','mode') * 0.6
    key_ohe = ohe_prep(df,'key','key') * 0.15
    time_ohe = ohe_prep(df,'time_signature','time') * 0.4

    #scale float columns
    floats = df[float_cols].reset_index(drop = True)
    scaler = MinMaxScaler()
    floats_scaled = pd.DataFrame(scaler.fit_transform(floats), columns = floats.columns) * 0.35

    #concanenate all features
    final = pd.concat([floats_scaled, mode_ohe, key_ohe, time_ohe, popularity_ohe], axis = 1)
    #final = pd.concat([genre_df, floats_scaled, mode_ohe, key_ohe, time_ohe, popularity_ohe, explicity_ohe], axis = 1)
     
    #add song id
    final['id']=df['id'].values
    
    return final

def load_data(db):

    docs = db.collection(u'songs-batched').stream()

    spotify_df = pd.DataFrame()
    for doc in docs:
        sngs = doc.get(u'songs')
        for sng in sngs:
            spotify_df = pd.concat([spotify_df, pd.DataFrame([sng])], ignore_index = True)

    return spotify_df

def perform_feature_engineering(df, float_cols):    

    # fix the genre column and prepare it for one-hot-encoding
    #df['genre'] = df['genre'].apply(lambda x: [re.sub(' ','_',i) for i in re.findall(r"'([^']*)'", x)])
    #df['genre'] = df['genre'].apply(lambda d: d if isinstance(d, list) else [])

    # create 5 point buckets for popularity 
    df['popularity_red'] = df['popularity'].apply(lambda x: int(x/5))

    #Drops duplicate song IDs, in case songs are repeated in the database and would generate good recommendations
    df = df.drop_duplicates(subset=['id'])

    #Run tfidf on genre list and finish preparation of the rest of the categories
    complete_feature_set = create_feature_set(df, float_cols=float_cols)

    return df, complete_feature_set

def authenticate_to_spotify():
    #Connor's client ID and secret, make sure to blank these out before pushing
    dir_path = os.path.dirname(os.path.realpath(__file__))
    id = open(dir_path + '/client_id.txt','r').read()
    secret = open(dir_path + '/client_secret.txt','r').read()

    #auth_manager = SpotifyClientCredentials(client_id=id, client_secret=secret)
    #sp = spotipy.Spotify(auth_manager=auth_manager)
    token = util.prompt_for_user_token(scope = 'user-library-read playlist-modify-public playlist-modify-private playlist-read-private streaming', client_id= id, client_secret=secret, redirect_uri='http://localhost:8881/')
    sp = spotipy.Spotify(auth=token)

    #gather playlist names and images. 
    #images aren't going to be used until I start building a UI
    id_name = {}
    list_photo = {}
    for i in sp.current_user_playlists()['items']:

        id_name[i['name']] = i['uri'].split(':')[2]
        list_photo[i['uri'].split(':')[2]] = i['images'][0]['url']

    return sp, id_name, list_photo

def create_necessary_outputs(db, playlist_ids, df):
    """ 
    Pull songs from a specific playlist.

    Parameters: 
        playlist_name (str): name of the playlist you'd like to pull from the spotify API
        id_dic (dic): dictionary that maps playlist_name to playlist_id
        df (pandas dataframe): spotify dataframe
        
    Returns: 
        playlist: all songs in the playlist THAT ARE AVAILABLE IN THE DATASET
    """
    
    #generate playlist dataframe

    playlist = pd.DataFrame()
    # playlist_ids = playlist_ids.split("[")[1].split("]")[0].split(",")
    ids = []
    docs = db.collection(u'users/Ihoc1nuTr9lL92TngABS/trees/2q5uA3rO1YnSd7pYXLUK/input-playlist').stream()
    for doc in docs:
        playlist = pd.concat([playlist, pd.DataFrame([{'id': doc.get(u'id')}])], ignore_index = True)

    #ensure there are no songs in the playlist
    #songs = sp.playlist(id_dic[playlist_name])['tracks']['items']
    #if len(songs) == 0:
        #print("Error: Playlist contains no songs. Try adding one or more songs to the playlist, then try again.")
        #return None

    #if there are songs, adds information to the playlist dataframe
    #for ix, i in enumerate(songs):
        #print(i['track']['artists'][0]['name'])
        #playlist.loc[ix, 'artist'] = i['track']['artists'][0]['name']
        #playlist.loc[ix, 'name'] = i['track']['name']
        #playlist.loc[ix, 'id'] = i['track']['id']
        #playlist.loc[ix, 'url'] = i['track']['album']['images'][1]['url']
        #playlist.loc[ix, 'date_added'] = i['added_at']

    #playlist['date_added'] = pd.to_datetime(playlist['date_added'])
    #print(playlist.to_string())
    
    #playlist = playlist[playlist['id'].isin(df['id'].values)]#.sort_values('date_added',ascending = False)
    #print(playlist.to_string())

    return playlist

def generate_playlist_feature(complete_feature_set, playlist_df, weight_factor):
    """ 
    Summarize a user's playlist into a single vector

    Parameters: 
        complete_feature_set (pandas dataframe): Dataframe which includes all of the features for the spotify songs
        playlist_df (pandas dataframe): playlist dataframe
        weight_factor (float): float value that represents the recency bias. The larger the recency bias, the most priority recent songs get. Value should be close to 1. 
        
    Returns: 
        playlist_feature_set_weighted_final (pandas series): single feature that summarizes the playlist
        complete_feature_set_nonplaylist (pandas dataframe): 
    """
    
    complete_feature_set_playlist = complete_feature_set[complete_feature_set['id'].isin(playlist_df['id'].values)]
    complete_feature_set_playlist = complete_feature_set_playlist.merge(playlist_df[['id']], on = 'id', how = 'inner')
    complete_feature_set_nonplaylist = complete_feature_set[~complete_feature_set['id'].isin(playlist_df['id'].values)]
    
    playlist_feature_set = complete_feature_set_playlist#.sort_values('date_added',ascending=False)

    #most_recent_date = playlist_feature_set.iloc[0,-1]
    
    #for ix, row in playlist_feature_set.iterrows():
        #playlist_feature_set.loc[ix,'months_from_recent'] = int((most_recent_date.to_pydatetime() - row.iloc[-1].to_pydatetime()).days / 30)
        
    playlist_feature_set['weight'] = np.ones(len(playlist_feature_set))
    
    playlist_feature_set_weighted = playlist_feature_set.copy()
    playlist_feature_set_weighted.update(playlist_feature_set_weighted.iloc[:,:-2].mul(playlist_feature_set_weighted.weight,0))
    playlist_feature_set_weighted_final = playlist_feature_set_weighted.iloc[:, :-2]
    #print(playlist_feature_set_weighted_final.to_string())
    
    return playlist_feature_set_weighted_final.sum(axis = 0), complete_feature_set_nonplaylist

def generate_playlist_recos(df, features, nonplaylist_features, top_many):
    """ 
    Pull songs from a specific playlist.

    Parameters: 
        df (pandas dataframe): spotify dataframe
        features (pandas series): summarized playlist feature
        nonplaylist_features (pandas dataframe): feature set of songs that are not in the selected playlist
        top_many (int): how many songs to return in the algorithm
        
    Returns: 
        non_playlist_df_top_x: Top top_many recommendations for that playlist
    """

    #good options: cosine similarity, cosine distances
    
    non_playlist_df = df[df['id'].isin(nonplaylist_features['id'].values)]
    #print(non_playlist_df)
    #print(pw.cosine_distances(nonplaylist_features.drop('id', axis = 1).values, features.values.reshape(1, -1)))
    non_playlist_df['sim'] = pw.cosine_distances(nonplaylist_features.drop('id', axis = 1).values, features.values.reshape(1, -1))
    non_playlist_df_top_x = non_playlist_df.sort_values('sim',ascending = True).head(top_many)
    #print(non_playlist_df_top_x)
    #non_playlist_df_top_x['url'] = non_playlist_df_top_x['id'].apply(lambda x: sp.track(x)['album']['images'][1]['url'])
    #print(non_playlist_df_top_x.to_string())
    
    return non_playlist_df_top_x

def extract_artists(artist_dict):
    str = ""
    n_artists = len(artist_dict)
    for artist in range(0,n_artists):
        str += artist_dict[artist]['name']
        if (artist != n_artists - 1):
            str += ", "
    return str

def output_recommendations(recs, sp):
    i = 0
    for rec in recs.iterrows():
        i += 1
        print(str(i) + ". " + sp.track(rec[1]['id'])['name'] + " by " + extract_artists(sp.track(rec[1]['id'])['artists']))

pd.set_option('display.max_columns', None)
#pname = "Bloom Algorithm Testing"

def perform_analysis(pname):
    #Firebase stuff
    project_id = "bloom-838b5"
    if not len(firebase_admin._apps):
        cred = credentials.ApplicationDefault()
        firebase_admin.initialize_app(cred, {'projectId': project_id})

    db = firestore.client()
    spotify_df = load_data(db)
    float_cols = np.concatenate([spotify_df.dtypes[spotify_df.dtypes == 'float64'].index.values,spotify_df.dtypes[spotify_df.dtypes == 'int64'].index.values])
    spotify_df, complete_feature_set = perform_feature_engineering(spotify_df, float_cols)
    #sp, id_name, list_photo = authenticate_to_spotify()
    test_playlist = create_necessary_outputs(db, pname, spotify_df)
    complete_feature_set_playlist_vector, complete_feature_set_nonplaylist = generate_playlist_feature(complete_feature_set, test_playlist, 1)
    recs_top10 = generate_playlist_recos(spotify_df, complete_feature_set_playlist_vector, complete_feature_set_nonplaylist, 2)
    return recs_top10['id']

@functions_framework.http
def algorithm(request):
    """HTTP Cloud Function.
    Args:
        request (flask.Request): The request object.
        <https://flask.palletsprojects.com/en/1.1.x/api/#incoming-request-data>
    Returns:
        The response text, or any set of values that can be turned into a
        Response object using `make_response`
        <https://flask.palletsprojects.com/en/1.1.x/api/#flask.make_response>.
    """

    if request.method == 'OPTIONS':
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Max-Age': '3600'
        }

        return ('', 204, headers)

    headers = {
        'Access-Control-Allow-Origin': '*'
    }
    request_json = request.get_json(silent=True)
    request_args = request.args

    if request_json and 'songs' in request_json:
        pname = request_json['songs']
    elif request_args and 'songs' in request_args:
        pname = request_args.get('data')
    else:
        pname = ''

    pname = request.data.decode('UTF-8')

    #print(request_args['songs'])
    recos = perform_analysis(pname)
    req = '{"songs":['
    for id in range(len(recos.values) - 1):
        req = req + '"' + recos.values[id] + '",'
        print(req)
    req = req + '"' + recos.values[len(recos.values)-1] + '"]}'
    print(req)
    print("Done!")
    return (req, 200, headers)

#print(perform_analysis("{\"songs\"=[\"05JdgtCKkZ5CoOjM5KS4EG\",\"0EH7sgeiFqDa3eS7ieW2zs\",\"0SLtqCrXBRrnkxSOMA3X4W\"]}"))
#hello_http(flask.Request)