import { Text, View } from "@/components/Themed";
import InfoCard from "@/components/details/InfoCard";
import { Link } from "expo-router";
import { TouchableOpacity } from "react-native";

export default function AboutScreen() {
  const DeveloperDetails = [
    {
      id: 0,
      cover: require("@/assets/images/ian_pfp.jpg"),
      fullName: "Marc Ian Fuentes",
    },

    {
      id: 1,
      cover: require("@/assets/images/james_pfp.jpg"),
      fullName: "James Michael Ricare",
    },
  ];

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

      {DeveloperDetails?.map((cards) => (
        <InfoCard
          id={cards.id}
          key={cards.fullName}
          name={cards.fullName}
          cover={cards.cover}
          course="BS-CompEng"
        />
      ))}
    </View>
  );
}
