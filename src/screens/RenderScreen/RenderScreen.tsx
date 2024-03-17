import { Canvas } from '@react-three/fiber';
import {
  Geometry3D,
  GeometryFigureNameType
} from '../../components/Geometry3D/Geometry3D';
import { useUserService } from '../../hooks/useUserService';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../routes/Routes';
import { BackButton } from '../../components/BackButton/BackButton';

export interface Geometry3DDataProps {
  geometryFigureName: GeometryFigureNameType;
  color: string;
  rotation?: number;
}

type ScreenProps = NativeStackScreenProps<RootStackParamList, 'RenderScreen'>;
export default function RenderScreen({ navigation }: ScreenProps) {
  const { getUser } = useUserService();
  const [data, setData] = useState<Geometry3DDataProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const userRecoveryData = await getUser();
    const dataTransform = userRecoveryData.config.map((item) => {
      return {
        geometryFigureName: item.shape,
        color: item.color,
        rotation: item.rotation
      };
    });
    setData(dataTransform);
    setLoading(false);
  }

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#e9ecef'
        }}
      >
        <ActivityIndicator size={'large'} />
      </View>
    );
  }
  return (
    <>
      <SafeAreaView style={{ padding: 16, backgroundColor: 'black' }}>
        <BackButton isWhite />
      </SafeAreaView>
      <Canvas style={{ backgroundColor: 'black' }}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />

        <Geometry3D {...data![0]} position={[0, 2, 0]} />

        <Geometry3D {...data![1]} position={[0, 0, 0]} />

        <Geometry3D {...data![2]} position={[0, -2, 0]} />
      </Canvas>
    </>
  );
}
