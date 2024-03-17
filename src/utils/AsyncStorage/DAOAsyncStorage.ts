import AsyncStorage from '@react-native-async-storage/async-storage';

export const setItem = async (content: string): Promise<boolean> => {
  try {
    await AsyncStorage.setItem('@HandTalkProject-uid', content);
    return true;
  } catch (error) {
    return false;
  }
};

export const getItem = async (): Promise<string | null> => {
  try {
    const value = await AsyncStorage.getItem('@HandTalkProject-uid');
    return value || null;
  } catch (error) {
    return null;
  }
};

export const removeItem = async (): Promise<boolean> => {
  try {
    await AsyncStorage.removeItem('@HandTalkProject-uid');
    return true;
  } catch (error) {
    return false;
  }
};
