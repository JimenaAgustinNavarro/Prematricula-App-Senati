// app/pre-matricula.tsx
import { SafeAreaView, ScrollView, View, Text, TextInput, Pressable } from 'react-native';
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { Link } from 'expo-router';

type FormData = {
  id: string;
  nombres: string;
  fecha: string;
  telefono: string;
  tipo_matricula: 'repitente' | 'reingresante' | '';
  periodo: string;
  semestre: string;
  curso: string;
};

export default function PreMatriculaForm() {
  const [form, setForm] = useState<FormData>({
    id: '',
    nombres: '',
    fecha: '',
    telefono: '',
    tipo_matricula: '',
    periodo: '',
    semestre: '',
    curso: ''
  });

  const handleChange = (key: keyof FormData, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const semestres = ['1er Semestre', '2do Semestre', '3er Semestre', '4to Semestre', '5to Semestre', '6to Semestre'];
  const cursosEjemplo = ['Desarrollo de Aplicaciones Móviles', 'Mejora de Método en el Trabajo', 'Formación de Monitores de Empresa'];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f8f9fb' }}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={{
          fontSize: 24,
          fontWeight: '600',
          marginBottom: 30,
          marginTop: 20,
          textAlign: 'center',
          color: '#072318'
        }}>
          Pre-Matrícula
        </Text>

        {/* Campos visibles siempre */}
        {['id', 'nombres', 'fecha', 'telefono'].map((key) => (
          <View key={key} style={{ marginBottom: 15 }}>
            <Text style={{ marginBottom: 5, fontSize: 14, color: '#555' }}>
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </Text>
            <TextInput
              placeholder={`Ingrese ${key}`}
              placeholderTextColor="#999"
              value={form[key as keyof FormData]}
              onChangeText={(text) => handleChange(key as keyof FormData, text)}
              style={{
                backgroundColor: '#ebeff4',
                padding: 12,
                borderRadius: 8,
                fontSize: 16,
              }}
            />
          </View>
        ))}

        {/* Tipo de Matrícula */}
        <Text style={{ marginBottom: 5, fontSize: 14, color: '#555' }}>Tipo de Matrícula</Text>
        <Picker
          selectedValue={form.tipo_matricula}
          onValueChange={(value) => handleChange('tipo_matricula', value)}
          style={{ backgroundColor: '#ebeff4', borderRadius: 8, marginBottom: 15 }}
        >
          <Picker.Item label="Seleccione tipo" value="" />
          <Picker.Item label="Repitente" value="repitente" />
          <Picker.Item label="Reingresante" value="reingresante" />
        </Picker>

        {/* Campos dinámicos según tipo de matrícula */}
        {form.tipo_matricula !== '' && (
          <>
            {/* Periodo */}
            <Text style={{ marginBottom: 5, fontSize: 14, color: '#555' }}>Periodo</Text>
            <Picker
              selectedValue={form.periodo || undefined} // evita que se vea undefined
              onValueChange={(value) => handleChange('periodo', String(value))}
              style={{ backgroundColor: '#ebeff4', borderRadius: 8, marginBottom: 15 }}
            >
              <Picker.Item label="Seleccione periodo" value="" />
              {form.tipo_matricula === 'repitente' &&
                ['2024-I', '2024-II', '2025-I', '2025-II'].map(p => (
                  <Picker.Item key={p} label={p} value={p} />
                ))
              }
              {form.tipo_matricula === 'reingresante' &&
                ['2025-II', '2026-I', '2026-II'].map(p => (
                  <Picker.Item key={p} label={p} value={p} />
                ))
              }
            </Picker>


            {/* Semestre */}
            <Text style={{ marginBottom: 5, fontSize: 14, color: '#555' }}>Semestre</Text>
            <Picker
              selectedValue={form.semestre}
              onValueChange={(value) => handleChange('semestre', value)}
              style={{ backgroundColor: '#ebeff4', borderRadius: 8, marginBottom: 15 }}
            >
              <Picker.Item label="Seleccione semestre" value="" />
              {semestres.map(s => (
                <Picker.Item key={s} label={s} value={s} />
              ))}
            </Picker>

            {/* Curso / Bloque solo para Repitente */}
    {form.tipo_matricula === 'repitente' && (
      <>
        <Text style={{ marginBottom: 5, fontSize: 14, color: '#555' }}>Curso a cargo</Text>
        <Picker
          selectedValue={form.curso || undefined}
          onValueChange={(value) => handleChange('curso', String(value))}
          style={{ backgroundColor: '#ebeff4', borderRadius: 8, marginBottom: 30 }}
        >
          <Picker.Item label="Seleccione curso" value="" />
          {cursosEjemplo.map(c => (
            <Picker.Item key={c} label={c} value={c} />
          ))}
        </Picker>
      </>
    )}
          </>
        )}

        {/* Botón Ir al pago */}
        <Link href="/payment" asChild>
                <Pressable style={{ backgroundColor: '#007bff', padding: 15, borderRadius: 8 }}>
                  <Text style={{ color: 'white', textAlign: 'center', fontWeight: '600' }}>Ir al pago</Text>
                </Pressable>
              </Link>

      </ScrollView>
    </SafeAreaView>
  );
}
