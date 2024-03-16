import { FirebaseApp, initializeApp } from 'firebase/app';
import { firebaseConfig } from './FirebaseConfig';

let firebaseInstance: FirebaseApp | null = null;

const getFirebaseInstance = () => {
  if (!firebaseInstance) {
    firebaseInstance = initializeApp(firebaseConfig);
  }
  return firebaseInstance;
};

export default getFirebaseInstance;
