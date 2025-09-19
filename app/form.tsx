//app/pre-matricula.tsx
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import { useEffect, useState } from "react";
import { Button, Platform, Pressable, SafeAreaView, ScrollView, Text, TextInput, View } from 'react-native';


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
  const router = useRouter();

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

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [showDatePicker, setShowDatePicker] = useState(false);

  const formatDate = (dateString: string) => {
  const d = new Date(dateString);
  return `${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}/${d.getFullYear()}`;
};


  const handleChange = (key: keyof FormData, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const semestres = ['1er Semestre', '2do Semestre', '3er Semestre', '4to Semestre', '5to Semestre', '6to Semestre'];
  const cursosEjemplo = ['Desarrollo de Aplicaciones Móviles', 'Mejora de Método en el Trabajo', 'Formación de Monitores de Empresa'];

  useEffect(() => {
    // Cargar ID precargado desde AsyncStorage
    const loadData = async () => {
      try {
        const storedId = await AsyncStorage.getItem("user_id");
        if (storedId) setForm((prev) => ({ ...prev, id: storedId }));
      } catch (error) {
        console.error("Error cargando datos", error);
      }
    };
    loadData();
  }, []);

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};


    if (!form.nombres) newErrors.nombres = "Los nombres son obligatorios";
    else if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/.test(form.nombres))
      newErrors.nombres = "Los nombres solo pueden contener letras y espacios";

    if (!form.fecha) newErrors.fecha = "La fecha es obligatoria";
    else if (!/^([0-2][0-9]|(3)[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/.test(form.fecha))

    if (!form.telefono) newErrors.telefono = "El teléfono es obligatorio";
    else if (!/^\d{9}$/.test(form.telefono)) newErrors.telefono = "El teléfono debe tener 9 dígitos";

    if (!form.periodo) newErrors.periodo = "Seleccione un periodo";
    if (!form.semestre) newErrors.semestre = "Seleccione un semestre";

    if (form.tipo_matricula === "repitente" && !form.curso)
      newErrors.curso = "Seleccione un curso";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        await AsyncStorage.setItem('preMatricula', JSON.stringify(form));
        router.push('/payment'); // Navega solo si el formulario es válido
      } catch (error) {
        console.error("Error guardando datos", error);
      }
    }
  };

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

        {['id', 'nombres', 'telefono'].map((key) => (
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
    {errors[key as keyof FormData] && <Text style={{ color: 'red', marginTop: 5 }}>{errors[key as keyof FormData]}</Text>}
  </View>
))}

{/* Fecha de nacimiento */}
<View style={{ marginBottom: 15 }}>
  <Text style={{ marginBottom: 5, fontSize: 14, color: '#555' }}>Fecha de Nacimiento</Text>

  <Button 
    title={form.fecha ? formatDate(form.fecha) : "Seleccionar Fecha"} 
    onPress={() => setShowDatePicker(true)} 
  />

  {showDatePicker && (
    <DateTimePicker
      value={form.fecha ? new Date(form.fecha) : new Date()}
      mode="date"
      display={Platform.OS === 'ios' ? 'spinner' : 'default'}
      onChange={(event, selectedDate) => {
        setShowDatePicker(Platform.OS === 'ios'); // mantener abierto en iOS
        if (selectedDate) {
          const formatted = selectedDate.toISOString().split('T')[0]; // yyyy-mm-dd
          handleChange('fecha', formatted);
        }
      }}
    />
  )}

  {errors.fecha && <Text style={{ color: 'red', marginTop: 5 }}>{errors.fecha}</Text>}
</View>


        {/* Tipo de Matrícula */}
        <Text style={{ marginBottom: 5, fontSize: 14, color: '#555' }}>Tipo de Matrícula</Text>
        <Picker
          selectedValue={form.tipo_matricula}
          onValueChange={(value) => handleChange('tipo_matricula', value)}
          style={{ backgroundColor: '#ebeff4', borderRadius: 8, marginBottom: 5 }}
        >
          <Picker.Item label="Seleccione tipo" value="" />
          <Picker.Item label="Repitente" value="repitente" />
          <Picker.Item label="Reingresante" value="reingresante" />
        </Picker>
        {errors.tipo_matricula && <Text style={{ color: 'red', marginBottom: 15 }}>{errors.tipo_matricula}</Text>}

        {/* Campos dinámicos según tipo de matrícula */}
        {form.tipo_matricula !== '' && (
          <>
            {/* Periodo */}
            <Text style={{ marginBottom: 5, fontSize: 14, color: '#555' }}>Periodo</Text>
            <Picker
              selectedValue={form.periodo || undefined}
              onValueChange={(value) => handleChange('periodo', String(value))}
              style={{ backgroundColor: '#ebeff4', borderRadius: 8, marginBottom: 5 }}
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
            {errors.periodo && <Text style={{ color: 'red', marginBottom: 15 }}>{errors.periodo}</Text>}

            {/* Semestre */}
            <Text style={{ marginBottom: 5, fontSize: 14, color: '#555' }}>Semestre</Text>
            <Picker
              selectedValue={form.semestre}
              onValueChange={(value) => handleChange('semestre', value)}
              style={{ backgroundColor: '#ebeff4', borderRadius: 8, marginBottom: 5 }}
            >
              <Picker.Item label="Seleccione semestre" value="" />
              {semestres.map(s => (
                <Picker.Item key={s} label={s} value={s} />
              ))}
            </Picker>
            {errors.semestre && <Text style={{ color: 'red', marginBottom: 15 }}>{errors.semestre}</Text>}

            {/* Curso solo para Repitente */}
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
                {errors.curso && <Text style={{ color: 'red', marginBottom: 15 }}>{errors.curso}</Text>}
              </>
            )}
          </>
        )}

        {/* Botón Ir al pago */}
        <Pressable
          style={{ backgroundColor: '#007bff', padding: 15, borderRadius: 8 }}
          onPress={handleSubmit}
        >
          <Text style={{ color: 'white', textAlign: 'center', fontWeight: '600' }}>Ir al pago</Text>
        </Pressable>

      </ScrollView>
    </SafeAreaView>
  );
}
