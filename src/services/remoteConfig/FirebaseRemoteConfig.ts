import remoteConfig from '@react-native-firebase/remote-config';

export function getDefaultConfig() {
  try {
    const config = remoteConfig().getValue('defaultConfigObjects').asString();
    return JSON.parse(config);
  } catch (error) {
    console.error('Erro ao obter configuração padrão:', error);
    return null;
  }
}

export async function getAndActivate(): Promise<boolean> {
  try {
    await remoteConfig().fetchAndActivate();
    return true;
  } catch (error) {
    console.error('Error fetching and activating remote config:', error);
    return false;
  }
}
