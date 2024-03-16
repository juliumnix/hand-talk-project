import { Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthService } from '../../hooks/useAuthService';
import { useRemoteConfig } from '../../hooks/useRemoteConfig';

export default function AuthScreen() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { loginUser } = useAuthService();
  const { getDefaultConfig } = useRemoteConfig();

  async function login() {
    try {
      const params = {
        email,
        password
      };
      const loggedUser = await loginUser(params);
      console.log(loggedUser);
      console.log(await getDefaultConfig());
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        value={email}
        placeholder="Insira seu Email"
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        value={password}
        secureTextEntry
        placeholder="Insira sua senha"
        onChangeText={(text) => setPassword(text)}
      />

      <TouchableOpacity onPress={login} style={styles.loginButton}>
        <Text>Login</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  loginButton: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
    height: 40
  }
});
