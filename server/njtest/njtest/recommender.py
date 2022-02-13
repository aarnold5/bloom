import pandas as pd
import numpy as np
import json
import re 
import sys
import itertools

import os

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.preprocessing import MinMaxScaler
import matplotlib.pyplot as plt


import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
from spotipy.oauth2 import SpotifyOAuth
import spotipy.util as util

import warnings
warnings.filterwarnings("ignore")

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
    tfidf = TfidfVectorizer()
    tfidf_matrix =  tfidf.fit_transform(df['genre'])
    genre_df = pd.DataFrame(tfidf_matrix.toarray())
    genre_df.columns = ['genre' + "|" + i for i in tfidf.get_feature_names()]
    genre_df.reset_index(drop = True, inplace=True)

    #explicity_ohe = ohe_prep(df, 'explicit','exp')    
    #year_ohe = ohe_prep(df, 'year','year') * 0.5
    popularity_ohe = ohe_prep(df, 'popularity_red','pop') * 0.15
    mode_ohe = ohe_prep(df, 'mode','mode')
    key_ohe = ohe_prep(df,'key','key')
    time_ohe = ohe_prep(df,'time_signature','time')

    #scale float columns
    floats = df[float_cols].reset_index(drop = True)
    scaler = MinMaxScaler()
    floats_scaled = pd.DataFrame(scaler.fit_transform(floats), columns = floats.columns) * 0.2

    #concanenate all features
    final = pd.concat([floats_scaled, popularity_ohe, mode_ohe, key_ohe, time_ohe], axis = 1)
     
    #add song id
    final['id']=df['track_id'].values
    
    return final

def load_data(filename):

    dir_path = os.path.dirname(os.path.realpath(__file__))
    #spotify_df = pd.read_json(dir_path + '/' + filename + '.json', orient='split')
    spotify_df = pd.read_csv(dir_path + '/' + filename + '.csv')
    #print(spotify_df.head())

    return spotify_df

def perform_feature_engineering(df):

    float_cols = df.dtypes[df.dtypes == 'float64'].index.values
    # create 5 point buckets for popularity 
    df['popularity_red'] = df['popularity'].apply(lambda x: int(x/5))

    #Drops duplicate song IDs, in case songs are repeated in the database and would generate good recommendations
    df = df.drop_duplicates(subset=['track_id'])

    #Run tfidf on genre list and finish preparation of the rest of the categories
    complete_feature_set = create_feature_set(df, float_cols=float_cols)

    return df, complete_feature_set

def authenticate_to_spotify():
    #Connor's client ID and secret, make sure to blank these out before pushing
    id = "206df76487be4f2fa3bd8277ca421cc5"
    secret = "d3236d593f0849da86f89af00c57ed7e"

    auth_manager = SpotifyClientCredentials(client_id=id, client_secret=secret)
    sp = spotipy.Spotify(auth_manager=auth_manager)
    token = util.prompt_for_user_token("user-library-read", client_id= id, client_secret=secret, redirect_uri='http://localhost:8881/')
    sp = spotipy.Spotify(auth=token)

    #gather playlist names and images. 
    #images aren't going to be used until I start building a UI
    id_name = {}
    list_photo = {}
    for i in sp.current_user_playlists()['items']:

        id_name[i['name']] = i['uri'].split(':')[2]
        list_photo[i['uri'].split(':')[2]] = i['images'][0]['url']

    return sp, id_name, list_photo

def create_necessary_outputs(playlist_name, id_dic, df):
    """ 
    Pull songs from a specific playlist.

    Parameters: 
        playlist_name (str): name of the playlist you'd like to pull from the spotify API
        id_dic (dic): dictionary that maps playlist_name to playlist_id
        df (pandas dataframe): spotify datafram
        
    Returns: 
        playlist: all songs in the playlist THAT ARE AVAILABLE IN THE KAGGLE DATASET
    """
    
    #generate playlist dataframe
    playlist = pd.DataFrame()
    playlist_name = playlist_name

    #ensure there are no songs in the playlist
    songs = sp.playlist(id_dic[playlist_name])['tracks']['items']
    if len(songs) == 0:
        print("Error: Playlist contains no songs. Try adding one or more songs to the playlist, then try again.")
        return None

    #if there are songs, adds information to the playlist dataframe
    for ix, i in enumerate(songs):
        #print(i['track']['artists'][0]['name'])
        playlist.loc[ix, 'artist'] = i['track']['artists'][0]['name']
        playlist.loc[ix, 'name'] = i['track']['name']
        playlist.loc[ix, 'id'] = i['track']['id']
        playlist.loc[ix, 'url'] = i['track']['album']['images'][1]['url']
        playlist.loc[ix, 'date_added'] = i['added_at']

    playlist['date_added'] = pd.to_datetime(playlist['date_added'])  
    
    playlist = playlist[playlist['id'].isin(df['track_id'].values)].sort_values('date_added',ascending = False)
    
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
    complete_feature_set_playlist = complete_feature_set_playlist.merge(playlist_df[['id','date_added']], on = 'id', how = 'inner')
    complete_feature_set_nonplaylist = complete_feature_set[~complete_feature_set['id'].isin(playlist_df['id'].values)]
    
    playlist_feature_set = complete_feature_set_playlist.sort_values('date_added',ascending=False)

    most_recent_date = playlist_feature_set.iloc[0,-1]
    
    for ix, row in playlist_feature_set.iterrows():
        playlist_feature_set.loc[ix,'months_from_recent'] = int((most_recent_date.to_pydatetime() - row.iloc[-1].to_pydatetime()).days / 30)
        
    playlist_feature_set['weight'] = playlist_feature_set['months_from_recent'].apply(lambda x: weight_factor ** (-x))
    
    playlist_feature_set_weighted = playlist_feature_set.copy()
    playlist_feature_set_weighted.update(playlist_feature_set_weighted.iloc[:,:-4].mul(playlist_feature_set_weighted.weight,0))
    playlist_feature_set_weighted_final = playlist_feature_set_weighted.iloc[:, :-4]
    
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
    
    non_playlist_df = df[df['track_id'].isin(nonplaylist_features['id'].values)]
    non_playlist_df['sim'] = cosine_similarity(nonplaylist_features.drop('id', axis = 1).values, features.values.reshape(1, -1))[:,0]
    non_playlist_df_top_x = non_playlist_df.sort_values('sim',ascending = False).head(top_many)
    non_playlist_df_top_x['url'] = non_playlist_df_top_x['track_id'].apply(lambda x: sp.track(x)['album']['images'][1]['url'])
    #print(non_playlist_df_top_x.to_string())
    
    return non_playlist_df_top_x

pd.set_option('display.max_columns', None)

spotify_df = load_data("SpotifyFeatures")
spotify_df, complete_feature_set = perform_feature_engineering(spotify_df)
float_cols = spotify_df.dtypes[spotify_df.dtypes == 'float64'].index.values
sp, id_name, list_photo = authenticate_to_spotify()
test_playlist = create_necessary_outputs("Bloom Algorithm Testing", id_name, spotify_df)
#print(test_playlist.to_string())
complete_feature_set_playlist_vector, complete_feature_set_nonplaylist = generate_playlist_feature(complete_feature_set, test_playlist, 1.09)
recs_top10 = generate_playlist_recos(spotify_df, complete_feature_set_playlist_vector, complete_feature_set_nonplaylist, 10)
print(recs_top10[['artist_name', 'track_name']].to_string())