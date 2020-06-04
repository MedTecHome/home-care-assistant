import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

/** production  */
export const firebaseConfig = {
  apiKey: 'AIzaSyCvb5QM0mEXHKBsOOWzolWGZkiHz0HDhDo',
  authDomain: 'test1-6f25a.firebaseapp.com',
  databaseURL: 'https://test1-6f25a.firebaseio.com',
  projectId: 'test1-6f25a',
  storageBucket: 'test1-6f25a.appspot.com',
  messagingSenderId: '901614831919',
  appId: '1:901614831919:web:0b419b8275a0b987ad79da',
  measurementId: 'G-B9SMXLR3TQ'
};

/** development */
/* const firebaseConfig = {
  apiKey: 'AIzaSyD3HF-WKk5cfN3ZyMlVaFOkQx6yCmAMD3U',
  authDomain: 'homecareself.firebaseapp.com',
  databaseURL: 'https://homecareself.firebaseio.com',
  projectId: 'homecareself',
  storageBucket: 'homecareself.appspot.com',
  messagingSenderId: '15248612263',
  appId: '1:15248612263:web:1fd05f547a170f5cebf482',
  measurementId: 'G-8TK106KRBQ'
}; */

firebase.initializeApp(firebaseConfig);
export default firebase;
export const authFirebase = firebase.auth();
export const storageFirebase = firebase.storage();
export const dbFirebase = firebase.firestore();
export const dbRef = doc => dbFirebase.collection('home-care-assistant').doc(doc);
// firebase.firestore.setLogLevel('debug');
