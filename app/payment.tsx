import { useState } from 'react';
import { View, Text, Button, Image, TouchableOpacity, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function PagoScreen() {
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      {/* Título */}
      <Text style={styles.title}>Comprobante de Pago</Text>
      <Text style={styles.subtitle}>
        Adjunta una foto clara del comprobante de pago. Asegúrate de que todos los detalles sean legibles.
      </Text>

      {/* Caja de carga */}
      <View style={styles.uploadBox}>
        {image ? (
          <Image source={{ uri: image }} style={styles.imagePreview} />
        ) : (
          <>
            <Text style={styles.uploadTitle}>Cargar Imagen</Text>
            <Text style={styles.uploadSubtitle}>Formato: JPG, PNG. Tamaño máximo: 5MB</Text>
            <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
              <Text style={{ color: "#fff", fontWeight: "600" }}>Seleccionar Archivo</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      {/* Botón de subir */}
      <TouchableOpacity style={styles.submitButton} onPress={() => alert("Comprobante enviado")}>
        <Text style={{ color: "#fff", fontWeight: "600" }}>Subir</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
    textAlign: "center",
  },
  uploadBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  uploadTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
  },
  uploadSubtitle: {
    fontSize: 12,
    color: "#666",
    marginBottom: 15,
    textAlign: "center",
  },
  uploadButton: {
    backgroundColor: "#333",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  imagePreview: {
    width: 200,
    height: 200,
    borderRadius: 8,
    resizeMode: "contain",
  },
  submitButton: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
});
