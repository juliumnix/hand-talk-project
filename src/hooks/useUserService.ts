import { createUser } from '../services/database/FirebaseCreateUserDB';
import { getUser } from '../services/database/FirebaseGetUserDB';
import { updateUser } from '../services/database/FirebaseUpdateUserDB';
import { loginUser } from '../services/login/FirebaseLogin';

export function useUserService() {
  return {
    createUser,
    loginUser,
    getUser,
    updateUser
  };
}
