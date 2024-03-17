// Import dependencies
import auth from '@react-native-firebase/auth';
import { loginUser } from '../src/services/login/FirebaseLogin';

jest.mock('@react-native-firebase/auth', () => ({
  __esModule: true,
  default: jest.fn()
}));

jest.mock('../src/hooks/useAsyncStorage', () => ({
  useAsyncStorage: () => ({
    setItem: jest.fn()
  })
}));

// Describe the function
describe('loginUser', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should log in with valid credentials', async () => {
    const mockSignInWithEmailAndPassword = jest
      .fn()
      .mockResolvedValue({ user: { uid: '123' } });
    auth.mockReturnValue({
      signInWithEmailAndPassword: mockSignInWithEmailAndPassword
    });

    const email = 'user@test.com';
    const password = 'securePassword';

    const result = await loginUser({ email, password });

    expect(mockSignInWithEmailAndPassword).toHaveBeenCalledWith(
      email,
      password
    );
    expect(result).toEqual({ user: { uid: '123' } });
  });

  it('should return undefined with invalid credentials', async () => {
    const result = await loginUser({ email: '', password: '' });
    expect(result).toBeUndefined();
  });
});
