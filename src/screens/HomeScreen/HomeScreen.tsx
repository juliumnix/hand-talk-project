import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAsyncStorage } from '../../hooks/useAsyncStorage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../routes/Routes';
import { Button } from '../../components/Button/Button';

type ScreenProps = NativeStackScreenProps<RootStackParamList, 'HomeScreen'>;

export function HomeScreen({ navigation }: ScreenProps) {
  const { removeItem } = useAsyncStorage();

  async function logoff() {
    await removeItem();
    navigation.replace('AuthScreen');
  }

  function navigateToRenderScreen() {
    navigation.navigate('RenderScreen');
  }

  function navigateToConfigScreen() {
    navigation.navigate('ConfigScreen');
  }
  return (
    <SafeAreaView style={styles.container}>
      <Button
        style={{ marginBottom: 16 }}
        onPress={navigateToRenderScreen}
        text="Ir para a Renderização"
      />

      <Button
        style={{ marginBottom: 16 }}
        onPress={navigateToConfigScreen}
        text="Ir para a Configurações"
      />

      <Button onPress={logoff} text="Sair do App" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e9ecef'
  }
});
