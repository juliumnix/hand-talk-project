import {
  getItem,
  setItem,
  removeItem
} from '../utils/AsyncStorage/DAOAsyncStorage';

export function useAsyncStorage() {
  return {
    setItem,
    getItem,
    removeItem
  };
}
