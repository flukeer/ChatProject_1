// firebase
import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCG8BVUmQDBxKullBCULjn948D-Q1ez5EA',
  authDomain: 'chatproject-6d625.appspot.com',
  projectId: 'chatproject-6d625',
  storageBucket: 'chatproject-6d625.appspot.com',
  messagingSenderId: '474569453',
  appId: '1:474569453:android:a5b37dede1eb3944dc8ae4',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // ถ้า Firebase ถูก initial แล้วจะเรียกใช้ app ที่มีอยู่
}

export const firestore = firebase.firestore();
