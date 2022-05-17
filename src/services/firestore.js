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
  await setDoc(doc(firestoreDB, '/users/Ihoc1nuTr9lL92TngABS/trees/2q5uA3rO1YnSd7pYXLUK/input-playlist', song.id), {
    id: song.id,
    name: song.name,
    album_cover: song.album_cover,
  });
}

export async function addToOutputPlaylist(song) {
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
  ret.songs = songids.map((id) => {
    const song = {};
    getDoc(doc(firestoreDB, 'songs', id))
      .then((songRef) => {
        song.name = songRef.get('name');
        song.album_cover = songRef.get('album_cover');
        song.id = id;
      });
    return song;
  });
  return ret;
}

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
        console.log(response.data);
        resolve(response.data);
      })
      .catch((error) => {
        console.log(`api error: ${error}`);
        reject(error);
      });
  });
};

export const loadTree = (treeID) => {
  const fields = { name: `users/Ihoc1nuTr9lL92TngABS/trees/${treeID}` };
  console.log(fields.name);
  return new Promise((resolve, reject) => {
    axios.post('https://us-central1-bloom-838b5.cloudfunctions.net/treeLoader', fields, {
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

export const addFirstNode = (node) => {
  const fields = {
    query: node,
  };
  return new Promise((resolve, reject) => {
    axios.post('https://us-central1-bloom-838b5.cloudfunctions.net/songnamequerier', fields, {
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

export const deleteNodes = (tree, path, songID) => {
  const fields = {
    tree, operation: 'DELETE', node_id: songID, attribute: '', name: path,
  };
  return new Promise((resolve, reject) => {
    axios.post('https://us-central1-bloom-838b5.cloudfunctions.net/treeFunctions', fields, {
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

export const generateChildren = (tree, path, songID) => {
  const fields = {
    tree, operation: 'GENERATE_CHILDREN', node_id: songID, attribute: '', name: path,
  };
  return new Promise((resolve, reject) => {
    axios.post('https://us-central1-bloom-838b5.cloudfunctions.net/treeFunctions', fields, {
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

export const showChildren = (tree, path, songID) => {
  const fields = {
    tree, operation: 'SHOW_CHILDREN', node_id: songID, attribute: '', name: path,
  };
  return new Promise((resolve, reject) => {
    axios.post('https://us-central1-bloom-838b5.cloudfunctions.net/treeFunctions', fields, {
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

export const createTree = () => {
  return new Promise((resolve, reject) => {
    axios.post('https://us-central1-bloom-838b5.cloudfunctions.net/treeCreator', {
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
