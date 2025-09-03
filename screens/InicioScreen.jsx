import React from 'react';
import { View, Text, Button } from 'react-native';

export default function InicioScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 22, marginBottom: 20 }}>Bienvenido Alumno</Text>
      <Button title="Prematrícula" onPress={() => navigation.navigate('Prematricula')} />
      <Button title="Cargar Imagen" onPress={() => navigation.navigate('CargarImagen')} />
    </View>
  );
}
