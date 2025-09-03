import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';

export default function PrematriculaScreen() {
  const [nombre, setNombre] = useState('');
  const [semestre, setSemestre] = useState('');
  const [curso, setCurso] = useState('');

  const handleSubmit = () => {
    Alert.alert("Prematrícula enviada", `Alumno: ${nombre}\nSemestre: ${semestre}\nCurso: ${curso}`);
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 22, marginBottom: 15 }}>Formulario de Prematrícula</Text>
      
      <TextInput
        placeholder="Nombre completo"
        value={nombre}
        onChangeText={setNombre}
        style={{ borderWidth: 1, marginBottom: 10, padding: 10, borderRadius: 5 }}
      />
      <TextInput
        placeholder="Semestre"
        value={semestre}
        onChangeText={setSemestre}
        style={{ borderWidth: 1, marginBottom: 10, padding: 10, borderRadius: 5 }}
      />
      <TextInput
        placeholder="Curso"
        value={curso}
        onChangeText={setCurso}
        style={{ borderWidth: 1, marginBottom: 10, padding: 10, borderRadius: 5 }}
      />

      <Button title="Enviar" onPress={handleSubmit} />
    </View>
  );
}
