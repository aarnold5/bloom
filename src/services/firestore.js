import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, setDoc } from 'firebase/firestore';
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
  querySnapshot.forEach((doc) => {
    treesReturn.trees.push({ id: doc.id, title: doc.get('name') });
  });
  return treesReturn;
}

export async function fetchPlaylist() {
  const querySnapshot = await getDocs(collection(firestoreDB, 'users/Ihoc1nuTr9lL92TngABS/trees/2q5uA3rO1YnSd7pYXLUK/output-playlist'));
  const playlistReturn = {
    playlist: [],
  };
  querySnapshot.forEach((doc) => {
    playlistReturn.playlist.push({ id: doc.id, title: doc.get('title'), albumCover: doc.get('albumCover') });
  });
  return playlistReturn;
}

export const popPlaylist = (song) => {
  await setDoc(doc(db, "/users/Ihoc1nuTr9lL92TngABS/trees/2q5uA3rO1YnSd7pYXLUK/input-playlist", song.id), {
    id: song.id,
    name: song.title,
    albumCover: song.albumCover,
  })
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
