import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

export const BRANCH_DEPLOY = process.env.REACT_APP_BRANCH_DEPLOY;

let firebaseConfig;

if (BRANCH_DEPLOY === 'develop') {
  firebaseConfig = {
    apiKey: 'AIzaSyCvb5QM0mEXHKBsOOWzolWGZkiHz0HDhDo',
    authDomain: 'test1-6f25a.firebaseapp.com',
    databaseURL: 'https://test1-6f25a.firebaseio.com',
    projectId: 'test1-6f25a',
    storageBucket: 'test1-6f25a.appspot.com',
    messagingSenderId: '901614831919',
    appId: '1:901614831919:web:0b419b8275a0b987ad79da',
    measurementId: 'G-B9SMXLR3TQ'
  };
} else if (BRANCH_DEPLOY === 'master') {
  firebaseConfig = {
    apiKey: 'AIzaSyDBKeMairY4huJmD-8BTSFdYqyw-QYMEUM',
    authDomain: 'homecareview-blaze.firebaseapp.com',
    databaseURL: 'https://homecareview-blaze.firebaseio.com',
    projectId: 'homecareview-blaze',
    storageBucket: 'homecareview-blaze.appspot.com',
    messagingSenderId: '758524699156',
    appId: '1:758524699156:web:214d415f4163af8e60bd01',
    measurementId: 'G-CSP88C3VV6'
  };
}

firebase.initializeApp(firebaseConfig);
export default firebase;
export const authFirebase = firebase.auth();
export const storageFirebase = firebase.storage();
export const dbFirebase = firebase.firestore();
// firebase.firestore.setLogLevel('debug');
