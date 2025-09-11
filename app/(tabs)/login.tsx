import { SafeAreaView, View, Text, TextInput, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export default function LoginScreen() {
  const [dni, setDni] = useState('');
  const [email, setEmail] = useState('');
  const [celular, setCelular] = useState('');
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f8f9fb', padding: 20 }}>
      <Text style={{ fontSize: 16, fontWeight: '600', textAlign: 'center', marginBottom: 20, marginTop: 25 }}>
        Pre-Matrícula
      </Text>
      <Text style={{ fontSize: 24, fontWeight: '600', textAlign: 'center', marginBottom: 40 }}>
        Bienvenido a Senati
      </Text>

      <TextInput
        placeholder="DNI"
        value={dni}
        onChangeText={setDni}
        style={{ backgroundColor: '#ebeff4', padding: 12, borderRadius: 8, marginBottom: 15 }}
      />
      <TextInput
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        style={{ backgroundColor: '#ebeff4', padding: 12, borderRadius: 8, marginBottom: 15 }}
      />
      <TextInput
        placeholder="Celular"
        value={celular}
        onChangeText={setCelular}
        style={{ backgroundColor: '#ebeff4', padding: 12, borderRadius: 8, marginBottom: 30 }}
      />

      <Pressable
        style={{ backgroundColor: '#007bff', padding: 15, borderRadius: 8 }}
        onPress={() => router.replace('/(tabs)/inicio')}
      ><Text style={{ color: 'white', textAlign: 'center', fontWeight: '600' }}>Iniciar Sesión</Text></Pressable>
    </SafeAreaView>
  );
}
