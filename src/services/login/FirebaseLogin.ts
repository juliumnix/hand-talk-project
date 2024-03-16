import { signInWithEmailAndPassword } from 'firebase/auth';
import { useFirebase } from '../../hooks/useFirebase';

interface LoginUserProps {
  email: string;
  password: string;
}
export async function loginUser({ email = '', password = '' }: LoginUserProps) {
  const { auth } = useFirebase();
  const userLogin = await signInWithEmailAndPassword(auth, email, password);
  return userLogin;
}
