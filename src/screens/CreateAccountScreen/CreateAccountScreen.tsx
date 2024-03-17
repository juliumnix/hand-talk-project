import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUserService } from '../../hooks/useUserService';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../routes/Routes';
import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';
import { BackButton } from '../../components/BackButton/BackButton';

type ScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'CreateAccountScreen'
>;

export default function CreateAccountScreen({ navigation }: ScreenProps) {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const { createUser } = useUserService();

  async function createAccount() {
    try {
      setLoading(true);
      const params = {
        email,
        password
      };
      const createdUser = await createUser(params);
      if (createdUser) {
        navigation.replace('HomeScreen');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ paddingLeft: 16, paddingTop: 8 }}>
        <BackButton />
      </View>

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Input
          value={email}
          placeholder="Insira seu melhor Email"
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          value={password}
          secureTextEntry
          placeholder="Insira sua senha"
          onChangeText={(text) => setPassword(text)}
        />

        <Button
          onPress={createAccount}
          text="Criar conta"
          isLoading={loading}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e9ecef'
  }
});
