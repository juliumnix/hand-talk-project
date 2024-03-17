import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthScreen from '../screens/AuthScreen/AuthScreen';
import RenderScreen from '../screens/RenderScreen/RenderScreen';
import { HomeScreen } from '../screens/HomeScreen/HomeScreen';
import ConfigScreen from '../screens/ConfigScreen/ConfigScreen';
import CreateAccountScreen from '../screens/CreateAccountScreen/CreateAccountScreen';

export type RootStackParamList = {
  AuthScreen: undefined;
  HomeScreen: undefined;
  RenderScreen: undefined;
  ConfigScreen: undefined;
  CreateAccountScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

interface RouterProps {
  initialRouteName: keyof RootStackParamList;
}
export function Router({ initialRouteName }: RouterProps) {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRouteName}
        screenOptions={{ headerShown: false, fullScreenGestureEnabled: true }}
      >
        <Stack.Screen name="AuthScreen" component={AuthScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="RenderScreen" component={RenderScreen} />
        <Stack.Screen name="ConfigScreen" component={ConfigScreen} />
        <Stack.Screen
          name="CreateAccountScreen"
          component={CreateAccountScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
