import { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";

export default function PagoScreen() {
  const [image, setImage] = useState<string | null>(null);
  const router = useRouter();

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

  const handleSubmit = () => {
    Alert.alert(
      "Comprobante enviado",
      "Tu comprobante de pago ha sido registrado correctamente.",
      [
        {
          text: "OK",
          onPress: () => router.replace("/confirmation")
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Título */}
      <Text style={styles.title}>Comprobante de Pago</Text>
      <Text style={styles.subtitle}>
        Adjunta una foto clara del comprobante de pago. Asegúrate de que todos
        los detalles sean legibles.
      </Text>

      {/* Caja de carga */}
      <View style={styles.uploadBox}>
        {image ? (
          <Image source={{ uri: image }} style={styles.imagePreview} />
        ) : (
          <>
            <Text style={styles.uploadTitle}>Cargar Imagen</Text>
            <Text style={styles.uploadSubtitle}>
              Formato: JPG, PNG. Tamaño máximo: 5MB
            </Text>
            <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
              <Text style={{ color: "#fff", fontWeight: "600" }}>
                Seleccionar Archivo
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      {/* Botón de subir */}
      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleSubmit}
        disabled={!image} // solo habilita si ya cargó imagen
      >
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
