import {
  getAndActivate,
  getDefaultConfig
} from '../services/remoteConfig/FirebaseRemoteConfig';

export function useRemoteConfig() {
  return {
    getDefaultConfig,
    fetchAndActivate: getAndActivate
  };
}
