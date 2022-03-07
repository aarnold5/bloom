import { initializeApp } from 'firebase/app';
import {
  getFirestore, collection, getDocs, setDoc, doc, where, query
} from 'firebase/firestore';
import axios from 'axios';

const firebaseConfig = {
  apiKey: 'AIzaSyD2qCSgsfdJOShdP3dTluGe7FZo3P18sB4',
  authDomain: 'bloom-838b5.firebaseapp.com',
  projectId: 'bloom-838b5',
  storageBucket: 'bloom-838b5.appspot.com',
  messagingSenderId: '98620041731',
  appId: '1:98620041731:web:3fc5f74041f2f3029c7c36',
  measurementId: 'G-T5X1Z5Z64J',
};

const firebaseApp = initializeApp(firebaseConfig);
const firestoreDB = getFirestore(firebaseApp);

// eslint-disable-next-line import/prefer-default-export
export async function fetchTrees() {
  const querySnapshot = await getDocs(collection(firestoreDB, 'users/Ihoc1nuTr9lL92TngABS/trees'));
  const treesReturn = {
    trees: [],
  };
  querySnapshot.forEach((d) => {
    treesReturn.trees.push({ id: d.id, title: d.get('name') });
  });
  return treesReturn;
}

export async function fetchPlaylist() {
  const querySnapshot = await getDocs(collection(firestoreDB, 'users/Ihoc1nuTr9lL92TngABS/trees/2q5uA3rO1YnSd7pYXLUK/output-playlist'));
  const playlistReturn = {
    playlist: [],
  };
  querySnapshot.forEach((d) => {
    playlistReturn.playlist.push({ id: d.id, title: d.get('title'), albumCover: d.get('albumCover') });
  });
  return playlistReturn;
}

export async function popPlaylist(song) {
  console.log(song);
  await setDoc(doc(firestoreDB, '/users/Ihoc1nuTr9lL92TngABS/trees/2q5uA3rO1YnSd7pYXLUK/input-playlist', song.id), {
    id: song.id,
    name: song.name,
    album_cover: song.album_cover,
  });
}

export async function fetchInputPlaylist() {
  const querySnapshot = await getDocs(collection(firestoreDB, 'users/Ihoc1nuTr9lL92TngABS/trees/2q5uA3rO1YnSd7pYXLUK/input-playlist'));
  const playlistReturn = {
    playlist: [],
  };
  querySnapshot.forEach((d) => {
    playlistReturn.playlist.push({ id: d.id, title: d.get('title'), albumCover: d.get('albumCover') });
  });
  return playlistReturn;
}

export async function songIDsToSongs(songids) {
  const querySnapshot = await getDocs(collection(firestoreDB, 'users/Ihoc1nuTr9lL92TngABS/trees/2q5uA3rO1YnSd7pYXLUK/input-playlist'));
  const ret = { songs: []};
  songids.forEach((id) => {
    const song = {};
    songRef = await getDoc(doc(firestoreDB, 'songs', id));
    song.title = songRef.get('name');
    song.album_cover = songRef.get('album_cover');
    song.id = id;
    ret.songs.push(song);
  });
  return ret;
}

export const getRecs = () => {
  const fields = {
    songs: await fetchInputPlaylist(),
  };
  return new Promise((resolve, reject) => {
    axios.post('https://us-central1-bloom-838b5.cloudfunctions.net/algorithm', fields, {
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        // console.log(response.data.results);
        resolve(response.data.results);
      })
      .catch((error) => {
        console.log(`api error: ${error}`);
        reject(error);
      });
  });
};

export const saveTree = (tree) => {
  const fields = tree;
  return new Promise((resolve, reject) => {
    axios.post('https://us-central1-bloom-838b5.cloudfunctions.net/treeSaver', fields, {
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        console.log(response.data.results);
        resolve(response.data.results);
      })
      .catch((error) => {
        console.log(`api error: ${error}`);
        reject(error);
      });
  });
};

export const loadTree = () => {
  const fields = tree;
  return new Promise((resolve, reject) => {
    axios.post('https://us-central1-bloom-838b5.cloudfunctions.net/treeLoader', fields, {
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        resolve(response.data.results);
      })
      .catch((error) => {
        console.log(`api error: ${error}`);
        reject(error);
      });
  });
};

export const addFirstNode = (node) => {
  const fields = {
    query: node,
  };
  return new Promise((resolve, reject) => {
    axios.post('https://us-central1-bloom-838b5.cloudfunctions.net/songnamequerier', fields, {
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        // console.log(response.data.results);
        resolve(response.data.results);
      })
      .catch((error) => {
        console.log(`api error: ${error}`);
        reject(error);
      });
  });
};
