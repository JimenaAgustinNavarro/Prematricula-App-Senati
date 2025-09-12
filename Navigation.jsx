import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from "./app/(tabs)/login"
import Inicio from "./app/(tabs)/inicio"
import Form from "./app/form"
import Payment from "./app/payment"
import Confirmation from "./app/confirmation"
const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Inicio" component={Inicio} />
        <Stack.Screen name="Prematricula" component={Form} />
        <Stack.Screen name="Pago" component={Payment} />
        <Stack.Screen name="Confirmación" component={Confirmation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
