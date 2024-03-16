import { initializeAuth, getReactNativePersistence, Auth } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import getFirebaseInstance from './FirebaseConnection';

let firebaseAuthInstance: Auth | null = null;

const getFirebaseAuthInstance = () => {
  if (!firebaseAuthInstance) {
    firebaseAuthInstance = initializeAuth(getFirebaseInstance(), {
      persistence: getReactNativePersistence(ReactNativeAsyncStorage)
    });
  }
  return firebaseAuthInstance;
};

export default getFirebaseAuthInstance;
