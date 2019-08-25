import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyB7oWFTr_VJa2xVIEj2WeN_tJ_F99ljYZM',
  authDomain: 'journal-e4e37.firebaseapp.com',
  databaseURL: 'https://journal-e4e37.firebaseio.com',
  projectId: 'journal-e4e37',
  storageBucket: '',
  messagingSenderId: '424654276547',
  appId: '1:424654276547:web:341cbf219110e359'
};

firebase.initializeApp(firebaseConfig);

const database = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { firebase, database, googleAuthProvider };
