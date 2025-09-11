import { SafeAreaView, View, Text, Pressable, ScrollView } from "react-native";
import { useRouter } from "expo-router";

export default function Confirmation() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f8f9fb" }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 20 }}>
        {/* Contenedor principal */}
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 12,
            padding: 20,
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
          }}
        >
          {/* Encabezado */}
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              textAlign: "center",
              marginBottom: 10,
              color: "#000",
            }}
          >
            Pre-Matrícula
          </Text>
          <Text
            style={{
              fontSize: 22,
              fontWeight: "700",
              textAlign: "center",
              marginBottom: 10,
              color: "#000",
            }}
          >
            ¡Pre-Matrícula Exitosa!
          </Text>
          <Text
            style={{
              fontSize: 14,
              textAlign: "center",
              color: "#555",
              marginBottom: 20,
            }}
          >
            Tu solicitud de pre-matrícula ha sido recibida y está en proceso de
            revisión. Te notificaremos sobre el estado de tu solicitud en breve.
          </Text>

          {/* Resumen */}
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              marginBottom: 10,
              color: "#000",
            }}
          >
            Resumen de la Solicitud
          </Text>

          {/* Fila Nombre - DNI */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 15,
              borderBottomWidth: 1,
              borderBottomColor: "#e0e0e0",
              paddingBottom: 8,
            }}
          >
            <View>
              <Text style={{ fontSize: 12, color: "#007bff" }}>Nombre</Text>
              <Text style={{ fontSize: 14, color: "#000" }}>Carlos Mendoza</Text>
            </View>
            <View>
              <Text style={{ fontSize: 12, color: "#007bff" }}>DNI</Text>
              <Text style={{ fontSize: 14, color: "#000" }}>78945612</Text>
            </View>
          </View>

          {/* Fila Programa - Sede */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 15,
              borderBottomWidth: 1,
              borderBottomColor: "#e0e0e0",
              paddingBottom: 8,
            }}
          >
            <View>
              <Text style={{ fontSize: 12, color: "#007bff" }}>Programa</Text>
              <Text style={{ fontSize: 14, color: "#000" }}>
                Mecánica Automotriz
              </Text>
            </View>
            <View>
              <Text style={{ fontSize: 12, color: "#007bff" }}>Sede</Text>
              <Text style={{ fontSize: 14, color: "#000" }}>Lima Norte</Text>
            </View>
          </View>

          {/* Ciclo */}
          <View>
            <Text style={{ fontSize: 12, color: "#007bff" }}>Ciclo</Text>
            <Text style={{ fontSize: 14, color: "#000" }}>III</Text>
          </View>
        </View>

        {/* Botón */}
        <Pressable
          style={{
            backgroundColor: "#007bff",
            padding: 15,
            borderRadius: 8,
            marginTop: 30,
          }}
          onPress={() => router.replace("/(tabs)/inicio")}
        >
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontWeight: "600",
            }}
          >
            Volver al Inicio
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
