import React from 'react';
import ReactDOM from 'react-dom';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import 'regenerator-runtime/runtime';
import './style.scss';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers';
import App from './app';

// boilerplate copied from https://cs52.me/assignments/sa/redux/
const store = createStore(reducers, {}, compose(
  applyMiddleware(),
  window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f,
));

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

async function printTrees() {
  const querySnapshot = await getDocs(collection(firestoreDB, 'users/Ihoc1nuTr9lL92TngABS/trees'));
  const treesReturn = {
    trees: [],
  };
  querySnapshot.forEach((doc) => {
    treesReturn.trees.push({ id: doc.id, title: doc.get('name') });
  });
  // console.log(treesReturn);
}

printTrees();
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('main'),
);
