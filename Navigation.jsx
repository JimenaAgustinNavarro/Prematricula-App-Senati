import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './screens/LoginScreen';
import InicioScreen from './screens/InicioScreen';
import FormScreen from './screens/FormScreen'
import PagoScreen from './screens/PagoScreen'
const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Inicio" component={InicioScreen} />
        <Stack.Screen name="Prematricula" component={FormScreen} />
        <Stack.Screen name="Pago" component={PagoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
