import React, { useEffect, useState } from 'react';
import getFirebaseInstance from './src/services/connections/FirebaseConnection';
import { Router } from './src/routes/Routes';
import { useAsyncStorage } from './src/hooks/useAsyncStorage';
import { ActivityIndicator, View } from 'react-native';
import { useRemoteConfig } from './src/hooks/useRemoteConfig';

let ID: string | null = null;
export default function App() {
  const { getItem } = useAsyncStorage();
  const { fetchAndActivate } = useRemoteConfig();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      await getFirebaseInstance();
      await fetchAndActivate();
      const value = await getItem();

      if (value !== null) {
        ID = value;
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  }

  return ID != null ? (
    <Router initialRouteName="HomeScreen" />
  ) : (
    <Router initialRouteName="AuthScreen" />
  );
}
