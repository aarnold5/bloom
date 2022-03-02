import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

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

export function fetchTrees(callback) {
  // get names & id of trees in JSON list
  return callback(printTrees());
}

async function printTrees() {
  const querySnapshot = await getDocs(collection(firestoreDB, 'users/Ihoc1nuTr9lL92TngABS/trees'));
  const treesReturn = {};
  querySnapshot.forEach((doc) => {
    treesReturn[doc.id] = doc.get('name');
  });
  console.log(treesReturn);

  
  return treesReturn;
}