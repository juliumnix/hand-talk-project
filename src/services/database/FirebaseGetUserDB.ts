import database from '@react-native-firebase/database';
import { useAsyncStorage } from '../../hooks/useAsyncStorage';
import { GeometryFigureNameType } from '../../components/Geometry3D/Geometry3D';

export interface GetUserProps {
  config: ConfigProps[];
}

export interface ConfigProps {
  color: string;
  shape: GeometryFigureNameType;
  rotation: number;
}
export async function getUser(): Promise<GetUserProps> {
  const { getItem } = useAsyncStorage();
  const uid = await getItem();
  const data = await database().ref(`users/${uid}`).once('value');
  return data.val() as GetUserProps;
}
