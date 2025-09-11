import { View, Text, Pressable } from 'react-native';
import { Link } from 'expo-router';


export default function InicioScreen() {
  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: '#f8f9fb' }}>
      <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 20, marginTop: 20, textAlign: 'center'}}>Inicio</Text>
      <Text style={{ fontSize: 22, fontWeight: '600', marginBottom: 20, marginTop: 20}}>Resumen</Text>

      <View style={{ backgroundColor: 'white', padding: 15, borderRadius: 10, marginBottom: 20 }}>
        <Text style={{ fontWeight: '500', marginBottom: 5 }}>Pre-Matrícula en Proceso</Text>
        <Text style={{ color: '#555', marginBottom: 10 }}>
          Tu solicitud está siendo revisada. Te notificaremos sobre el estado.
        </Text>
        <Pressable style={{ alignSelf: 'flex-start', padding: 8 }}>
          <Text style={{ color: '#007bff' }}>Ver Detalles →</Text>
        </Pressable>
      </View>

      <Text style={{ fontSize: 18, fontWeight: '500', marginBottom: 10 }}>Acciones</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Pressable style={{ backgroundColor: 'white', padding: 15, borderRadius: 10, flex: 1, marginRight: 10 }}>
          <Text>Editar Datos</Text>
        </Pressable>
        <Pressable style={{ backgroundColor: 'white', padding: 15, borderRadius: 10, flex: 1, marginLeft: 10 }}>
          <Text>Ver Horario</Text>
        </Pressable>
      </View>

      <Pressable style={{ marginTop: 15, backgroundColor: 'white', padding: 15, borderRadius: 10 }}>
        <Text>Ayuda</Text>
      </Pressable>
      <Link href="/form" asChild>
        <Pressable style={{ backgroundColor: '#007bff', padding: 15, borderRadius: 8, marginTop: 20}}>
          <Text style={{ color: 'white', textAlign: 'center', fontWeight: '600' }}>Realizar Pre-matrícula</Text>
        </Pressable>
      </Link>
    </View>
  );
}
