import { signInWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import { useFirebase } from '../../hooks/useFirebase';
import { loginUser } from '../login/FirebaseLogin';

interface CreateUserProps {
  email: string;
  password: string;
}
export async function createUser({
  email,
  password
}: CreateUserProps): Promise<boolean> {
  const { database } = useFirebase();
  try {
    const userLogin = await loginUser({ email, password });
    await set(ref(database, 'users/' + userLogin.user.uid), {
      username: userLogin.user.email
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
