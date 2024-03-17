import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import { useRemoteConfig } from '../../hooks/useRemoteConfig';
import { useAsyncStorage } from '../../hooks/useAsyncStorage';

interface CreateUserProps {
  email: string;
  password: string;
}
export async function createUser({
  email,
  password
}: CreateUserProps): Promise<boolean> {
  try {
    if (email === '' || password === '') {
      return false;
    }
    const { getDefaultConfig } = useRemoteConfig();
    const { setItem } = useAsyncStorage();

    const userLogin = await auth().createUserWithEmailAndPassword(
      email,
      password
    );

    const data = getDefaultConfig();
    await setItem(userLogin.user.uid);
    await database().ref(`users/${userLogin?.user.uid}`).set({
      username: userLogin?.user.email,
      config: data
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
