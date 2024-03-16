import { createUser } from '../services/database/FirebaseCreateUserDB';
import { loginUser } from '../services/login/FirebaseLogin';

export function useAuthService() {
  return {
    createUser,
    loginUser
  };
}
