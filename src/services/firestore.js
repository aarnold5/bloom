import { initializeApp } from 'firebase/app';
import {
  getFirestore, collection, getDocs, setDoc, doc, getDoc,
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
    treesReturn.trees.push({ id: d.id, name: d.get('name') });
  });
  return treesReturn;
}

export async function fetchPlaylist() {
  const querySnapshot = await getDocs(collection(firestoreDB, 'users/Ihoc1nuTr9lL92TngABS/trees/2q5uA3rO1YnSd7pYXLUK/output-playlist'));
  const playlistReturn = {
    playlist: [],
  };
  querySnapshot.forEach((d) => {
    playlistReturn.playlist.push({ id: d.id, title: d.get('name'), albumCover: d.get('album_cover') });
  });
  return playlistReturn;
}

export async function popPlaylist(song) {
  // console.log(song);
  await setDoc(doc(firestoreDB, '/users/Ihoc1nuTr9lL92TngABS/trees/2q5uA3rO1YnSd7pYXLUK/input-playlist', song.id), {
    id: song.id,
    name: song.name,
    album_cover: song.album_cover,
  });
}

export async function addToOutputPlaylist(song) {
  // console.log(song);
  await setDoc(doc(firestoreDB, '/users/Ihoc1nuTr9lL92TngABS/trees/2q5uA3rO1YnSd7pYXLUK/output-playlist', song.id), {
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
    playlistReturn.playlist.push({ id: d.id, name: d.get('name'), album_cover: d.get('album_cover') });
  });
  return playlistReturn;
}

export async function songIDsToSongs(songids) {
  const ret = { songs: [] };
  // eslint-disable-next-line no-plusplus
  for (let i; i < songids.length; i++) {
    // eslint-disable-next-line no-await-in-loop
    const songRef = await getDoc(doc(firestoreDB, 'songs', songids[i]));
    const song = {
      name: songRef.get('name'),
      album_cover: songRef.get('album_cover'),
      id: songids[i],
    };
    ret.songs.push(song);
  }
  return ret;
}

/* export async function songIDsToSongs(songids) {
  const ret = { songs: [] };
  ret.songs = songids.map((id) => {
    console.log(id);
    const song = {};
    getDoc(doc(firestoreDB, 'songs', id))
      .then((songRef) => {
        console.log(songRef);
        song.name = songRef.get('name');
        song.album_cover = songRef.get('album_cover');
        song.id = id;
      });
    return song;
  });
  return ret;
} */

export const getRecs = () => {
  const fields = {
    songs: fetchInputPlaylist(),
  };
  return new Promise((resolve, reject) => {
    axios.post('https://us-central1-bloom-838b5.cloudfunctions.net/algorithm', fields, {
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        resolve(response.data);
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

export const loadTree = (tree) => {
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
