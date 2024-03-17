import {
  getAndActivate,
  getDefaultConfig
} from '../src/services/remoteConfig/FirebaseRemoteConfig';

jest.mock('@react-native-firebase/remote-config', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    getValue: jest.fn().mockReturnValue({
      asString: jest.fn().mockReturnValue('{"key": "value"}')
    }),
    fetchAndActivate: jest.fn().mockResolvedValue(undefined)
  }))
}));

describe('getDefaultConfig', () => {
  it('should return default config', () => {
    const config = getDefaultConfig();
    expect(config).toEqual({ key: 'value' });
  });

  it('should return true when activation succeeds', async () => {
    const result = await getAndActivate();
    expect(result).toBe(true);
  });

  it('should return false when activation fails', async () => {
    (
      require('@react-native-firebase/remote-config').default as jest.Mock
    ).mockReturnValue({
      fetchAndActivate: jest.fn().mockRejectedValueOnce(new Error('Test Error'))
    });

    const result = await getAndActivate();
    expect(result).toBe(false);
  });
});
