import auth from '@react-native-firebase/auth';
import { useAsyncStorage } from '../../hooks/useAsyncStorage';
interface LoginUserProps {
  email: string;
  password: string;
}
export async function loginUser({ email = '', password = '' }: LoginUserProps) {
  if (email === '' || password === '') {
    return;
  }
  const { setItem } = useAsyncStorage();
  const userLogin = await auth().signInWithEmailAndPassword(email, password);
  await setItem(userLogin.user.uid);
  return userLogin;
}
