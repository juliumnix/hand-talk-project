import { GeometryFigureNameType } from '../../components/Geometry3D/Geometry3D';
import { useFirebase } from '../../hooks/useFirebase';
import {
  fetchAndActivate,
  getRemoteConfig,
  getValue
} from 'firebase/remote-config';

interface DefaultConfigProps {
  shape: GeometryFigureNameType;
  color: string;
  rotation: number;
}

export async function getDefaultConfig() {
  try {
    const { app } = useFirebase();
    const remoteConfig = getRemoteConfig(app);
    console.log(remoteConfig);
    // remoteConfig.settings.minimumFetchIntervalMillis = 3600000;
    // await fetchAndActivate(remoteConfig);
    // const values = getValue(remoteConfig, 'defaultConfig');
    // return values;
  } catch (error) {
    console.error('Erro ao obter configuração padrão:', error);
    return null;
  }
}
