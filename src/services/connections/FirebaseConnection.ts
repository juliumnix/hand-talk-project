import firebase from '@react-native-firebase/app';
import { firebaseConfig } from './FirebaseConfig';

let firebaseInstance = null;

const getFirebaseInstance = () => {
  if (firebase.apps.length === 0) {
    firebaseInstance = firebase.initializeApp(firebaseConfig);
  } else {
    firebaseInstance = firebase.app();
  }

  return firebaseInstance;
};

export default getFirebaseInstance;
