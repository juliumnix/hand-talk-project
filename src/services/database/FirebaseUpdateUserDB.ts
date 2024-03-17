import database from '@react-native-firebase/database';
import { useAsyncStorage } from '../../hooks/useAsyncStorage';
import { ConfigProps } from './FirebaseGetUserDB';

export async function updateUser(
  dataParameter: ConfigProps[]
): Promise<boolean> {
  const { getItem } = useAsyncStorage();
  try {
    const uid = await getItem();
    const configNewData: ConfigProps[] = dataParameter;
    await database().ref(`users/${uid}`).update({
      config: configNewData
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
