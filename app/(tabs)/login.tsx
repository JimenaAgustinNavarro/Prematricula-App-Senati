import { SafeAreaView, Text, TextInput, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen() {
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    if (!id || !email) {
      alert("Por favor complete todos los campos");
      return;
    }

    try {
      // Guardar en AsyncStorage
      await AsyncStorage.setItem("user_id", id);
      await AsyncStorage.setItem("user_email", email);

      // Redirigir
      router.replace("/(tabs)/inicio");
    } catch (error) {
      console.error("Error guardando datos", error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f8f9fb", padding: 20 }}>
      <Text
        style={{
          fontSize: 16,
          fontWeight: "600",
          textAlign: "center",
          marginBottom: 20,
          marginTop: 25,
        }}
      >
        Pre-Matrícula
      </Text>
      <Text
        style={{
          fontSize: 24,
          fontWeight: "600",
          textAlign: "center",
          marginBottom: 40,
        }}
      >
        Bienvenido a Senati
      </Text>

      <TextInput
        placeholder="ID"
        value={id}
        onChangeText={setId}
        style={{
          backgroundColor: "#ebeff4",
          padding: 12,
          borderRadius: 8,
          marginBottom: 15,
        }}
      />
      <TextInput
        placeholder="Correo institucional"
        value={email}
        onChangeText={setEmail}
        style={{
          backgroundColor: "#ebeff4",
          padding: 12,
          borderRadius: 8,
          marginBottom: 30,
        }}
      />

      <Pressable
        style={{ backgroundColor: "#007bff", padding: 15, borderRadius: 8 }}
        onPress={handleLogin}
      >
        <Text
          style={{ color: "white", textAlign: "center", fontWeight: "600" }}
        >
          Iniciar Sesión
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}
