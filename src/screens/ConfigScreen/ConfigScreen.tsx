import { useEffect, useState } from 'react';
import { useUserService } from '../../hooks/useUserService';
import { Geometry3DDataProps } from '../RenderScreen/RenderScreen';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { GeometryFigureNameType } from '../../components/Geometry3D/Geometry3D';
import { useRemoteConfig } from '../../hooks/useRemoteConfig';
import { ConfigProps } from '../../services/database/FirebaseGetUserDB';
import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';
import { RootStackParamList } from '../../routes/Routes';
import { BackButton } from '../../components/BackButton/BackButton';

type ScreenProps = NativeStackScreenProps<RootStackParamList, 'ConfigScreen'>;
export default function ConfigScreen({ navigation }: ScreenProps) {
  const [data, setData] = useState<Geometry3DDataProps[]>([]);
  const [selectedValue, setSelectedValue] = useState<number>(0);
  const [manipulatedObject, setManipulatedObject] =
    useState<Geometry3DDataProps>({} as Geometry3DDataProps);
  const [loading, setLoading] = useState(true);
  const { getUser, updateUser } = useUserService();
  const { getDefaultConfig } = useRemoteConfig();

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
    setManipulatedObject(dataTransform[0]);
    setLoading(false);
  }

  function getSelectedData(indexSelected: number) {
    const dataSelected = data.find((_, index) => index === indexSelected);
    setSelectedValue(indexSelected);
    setManipulatedObject(dataSelected!);
  }

  async function getDefaultConfigsFromRemoteConfig() {
    const data = getDefaultConfig() as ConfigProps[];
    const defaltData = data.map((item) => {
      return {
        geometryFigureName: item.shape,
        color: item.color,
        rotation: item.rotation
      };
    });
    setManipulatedObject(defaltData[selectedValue!]);
    setData((prevState) => {
      return [...defaltData];
    });
  }

  function sendToDatabse() {
    setData((prevState) => {
      const newData = [...prevState];
      newData[selectedValue!] = manipulatedObject;
      const mappedForDatabase = newData.map((item) => ({
        shape: item.geometryFigureName,
        color: item.color,
        rotation: item.rotation!
      }));
      updateUser(mappedForDatabase);
      return newData;
    });
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
    <SafeAreaView
      style={{
        flex: 1,
        paddingHorizontal: 16
      }}
    >
      <BackButton />

      <Text style={styles.textStyle}>Qual imagem deseja alterar?</Text>
      <View
        style={{
          alignItems: `center`
        }}
      >
        <FlatList
          data={data}
          horizontal={true}
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center'
          }}
          ItemSeparatorComponent={() => {
            return (
              <View
                style={{
                  width: 10
                }}
              />
            );
          }}
          renderItem={({ item, index }) => {
            return (
              <Button
                textColor={index === selectedValue ? '#F8F9FA' : '#212529'}
                style={[
                  styles.buttonStyles,
                  {
                    backgroundColor:
                      index === selectedValue ? '#212529' : '#F8F9FA'
                  }
                ]}
                text={item.geometryFigureName}
                onPress={() => {
                  getSelectedData(index);
                }}
              />
            );
          }}
        />
      </View>
      <View>
        <Text style={styles.textStyle}>Deseja trocar o formato da imagem?</Text>
        <View
          style={{
            justifyContent: `center`,
            alignItems: `center`
          }}
        >
          <FlatList
            data={[
              {
                geometryFigureName: 'cube' as GeometryFigureNameType
              },
              {
                geometryFigureName: 'cone' as GeometryFigureNameType
              },
              {
                geometryFigureName: 'dodecahedron' as GeometryFigureNameType
              }
            ]}
            horizontal={true}
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: 'center',
              alignItems: 'center'
            }}
            ItemSeparatorComponent={(item) => {
              return (
                <View
                  style={{
                    width: 10
                  }}
                />
              );
            }}
            renderItem={({ item, index }) => {
              return (
                <Button
                  text={item.geometryFigureName}
                  style={styles.buttonStyles}
                  onPress={() => {
                    setManipulatedObject((prevState) => ({
                      ...prevState,
                      geometryFigureName: item.geometryFigureName
                    }));
                    setData((prevState) => {
                      const newData = [...prevState];
                      newData[selectedValue!] = {
                        ...manipulatedObject,
                        geometryFigureName: item.geometryFigureName
                      };
                      return newData;
                    });
                  }}
                />
              );
            }}
          />
        </View>
        <View>
          <Text style={styles.textStyle}>Deseja trocar a cor da Imagem?</Text>
          <Input
            style={{ width: '100%' }}
            value={manipulatedObject.color}
            onBlur={() => {
              setData((prevState) => {
                const newData = [...prevState];
                newData[selectedValue!] = manipulatedObject;
                return newData;
              });
            }}
            onChangeText={(text) => {
              setManipulatedObject((prevState) => ({
                ...prevState,
                color: text
              }));
            }}
          />
        </View>

        <View>
          <Text style={styles.textStyle}>
            Deseja trocar a rotação do objeto da Imagem?
          </Text>
          <Input
            style={{ width: '100%' }}
            keyboardType="numeric"
            value={manipulatedObject.rotation?.toString()}
            onBlur={() => {
              setData((prevState) => {
                const newData = [...prevState];
                newData[selectedValue!] = manipulatedObject;
                return newData;
              });
            }}
            onChangeText={(text) => {
              setManipulatedObject((prevState) => ({
                ...prevState,
                rotation: Number(text)
              }));
            }}
          />
        </View>
        <Button
          text="Salvar"
          style={{
            width: `100%`
          }}
          onPress={sendToDatabse}
        />

        <Button
          text="Confingurações padrão"
          style={{
            width: `100%`,
            marginTop: 8
          }}
          onPress={getDefaultConfigsFromRemoteConfig}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  buttonStyles: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 100,
    backgroundColor: '#212529'
  },
  textStyle: {
    fontWeight: 'bold',
    paddingBottom: 8,
    paddingTop: 16
  }
});
