import { View, Text, Pressable } from "react-native";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function InicioScreen() {
  const [hasPrematricula, setHasPrematricula] = useState(false);
const [estado, setEstado] = useState<string | null>(null);

  useEffect(() => {
    const loadEstado = async () => {
      const saved = await AsyncStorage.getItem("matricula_estado");
      setEstado(saved);
    };
    loadEstado();
  }, []);

  return (
     <View style={{ flex: 1, padding: 20, backgroundColor: "#f8f9fb" }}>
      <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 20, marginTop: 20, textAlign: "center"}}>
        Inicio
      </Text>
      <Text style={{ fontSize: 22, fontWeight: "600", marginBottom: 20, marginTop: 20 }}>
        Resumen
      </Text>

      {estado === "en_proceso" ? (
        // 🔹 Mostrar bloque de resumen si ya hay matrícula
        <View style={{ backgroundColor: "white", padding: 15, borderRadius: 10, marginBottom: 20 }}>
          <Text style={{ fontWeight: "500", marginBottom: 5 }}>Pre-Matrícula en Proceso</Text>
          <Text style={{ color: "#555", marginBottom: 10 }}>
            Tu solicitud está siendo revisada. Te notificaremos sobre el estado.
          </Text>
          <Pressable style={{ alignSelf: "flex-start", padding: 8 }}>
            <Text style={{ color: "#007bff" }}>Ver Detalles →</Text>
          </Pressable>
        </View>
      ) : (
        // 🔹 Mostrar solo el botón si NO hay matrícula
        <Link href="/form" asChild>
          <Pressable style={{ backgroundColor: "#007bff", padding: 15, borderRadius: 8, marginTop: 20}}>
            <Text style={{ color: "white", textAlign: "center", fontWeight: "600" }}>
              Realizar Pre-matrícula
            </Text>
          </Pressable>
        </Link>
      )}
    </View>
  );
}
