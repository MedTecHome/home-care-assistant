import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCvb5QM0mEXHKBsOOWzolWGZkiHz0HDhDo',
  authDomain: 'test1-6f25a.firebaseapp.com',
  databaseURL: 'https://test1-6f25a.firebaseio.com',
  projectId: 'test1-6f25a',
  storageBucket: 'test1-6f25a.appspot.com',
  messagingSenderId: '901614831919',
  appId: '1:901614831919:web:0b419b8275a0b987ad79da',
  measurementId: 'G-B9SMXLR3TQ',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase;
