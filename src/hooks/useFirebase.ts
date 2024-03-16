import { getDatabase } from 'firebase/database';
import { getRemoteConfig } from 'firebase/remote-config';
import getFirebaseInstance from '../services/connections/FirebaseConnection';
import getFirebaseAuthInstance from '../services/connections/FirebaseAuth';

export function useFirebase() {
  const app = getFirebaseInstance();
  const auth = getFirebaseAuthInstance();
  const database = getDatabase(app);
  const remoteConfig = getRemoteConfig(app);

  return {
    app,
    auth,
    database,
    remoteConfig
  };
}
