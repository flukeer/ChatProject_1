// firebase.js
import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCG8BVUmQDBxKullBCULjn948D-Q1ez5EA',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'chatproject-6d625',
  storageBucket: 'chatproject-6d625.appspot.com',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: '1:474569453:android:a5b37dede1eb3944dc8ae4',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const firestore = firebase.firestore();
