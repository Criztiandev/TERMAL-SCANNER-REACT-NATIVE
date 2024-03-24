import { Text, View } from "@/components/Themed";
import InfoCard from "@/components/details/InfoCard";
import { Link } from "expo-router";
import { TouchableOpacity } from "react-native";

export default function AboutScreen() {
  return (
    <View style={{ backgroundColor: "white", height: "100%", padding: 16 }}>
      <Text
        style={{
          textAlign: "center",
          fontSize: 32,
          marginTop: 32,
          marginBottom: 16,
          fontWeight: "bold",
        }}>
        About us
      </Text>

      <InfoCard name="Marc Ian Fuentes" course="BS-CompEng" />
      <InfoCard name="James Michael Ricare" course="BS-CompEng" />
    </View>
  );
}
