import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const standardConfig = {
  apiKey: 'AIzaSyB7oWFTr_VJa2xVIEj2WeN_tJ_F99ljYZM',
  authDomain: 'journal-e4e37.firebaseapp.com',
  databaseURL: 'https://journal-e4e37.firebaseio.com',
  projectId: 'journal-e4e37',
  storageBucket: '',
  messagingSenderId: '424654276547',
  appId: '1:424654276547:web:341cbf219110e359'
};

const testConfig = {
  apiKey: 'AIzaSyBbCyR0Mul1w-s9zM35kz93ft1Fch3EklM',
  authDomain: 'journal-test-da59a.firebaseapp.com',
  databaseURL: 'https://journal-test-da59a.firebaseio.com',
  projectId: 'journal-test-da59a',
  storageBucket: '',
  messagingSenderId: '820529092236',
  appId: '1:820529092236:web:9b17b1266ad5af71b9cda9'
};

const firebaseConfig =
  process.env.NODE_ENV === 'test' ? testConfig : standardConfig;

firebase.initializeApp(firebaseConfig);

const database = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { firebase, database, googleAuthProvider };
