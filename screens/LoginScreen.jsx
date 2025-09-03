import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

export default function LoginScreen({ navigation }) {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Aquí iría tu validación
    navigation.replace('Inicio');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20, textAlign: 'center' }}>Iniciar Sesión</Text>
      <TextInput
        placeholder="Correo"
        value={correo}
        onChangeText={setCorreo}
        style={{ borderWidth: 1, marginBottom: 10, padding: 10, borderRadius: 5 }}
      />
      <TextInput
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{ borderWidth: 1, marginBottom: 10, padding: 10, borderRadius: 5 }}
      />
      <Button title="Entrar" onPress={handleLogin} />
    </View>
  );
}
