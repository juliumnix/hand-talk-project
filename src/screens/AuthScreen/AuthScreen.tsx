import { StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUserService } from '../../hooks/useUserService';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../routes/Routes';
import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';

type ScreenProps = NativeStackScreenProps<RootStackParamList, 'AuthScreen'>;

export default function AuthScreen({ navigation }: ScreenProps) {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const { loginUser } = useUserService();

  async function login() {
    try {
      setLoading(true);
      const params = {
        email,
        password
      };
      const loggedUser = await loginUser(params);
      if (loggedUser) {
        navigation.replace('HomeScreen');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  function navigateToCreateAccount() {
    navigation.navigate('CreateAccountScreen');
  }
  return (
    <SafeAreaView style={styles.container}>
      <Input
        value={email}
        placeholder="Insira seu Email"
        onChangeText={(text) => setEmail(text)}
      />
      <Input
        value={password}
        secureTextEntry
        placeholder="Insira sua senha"
        onChangeText={(text) => setPassword(text)}
      />

      <Button onPress={login} text="Login" isLoading={loading} />

      <Button
        style={{ marginTop: 16 }}
        onPress={navigateToCreateAccount}
        text="Criar uma conta"
        isLoading={loading}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e9ecef',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
