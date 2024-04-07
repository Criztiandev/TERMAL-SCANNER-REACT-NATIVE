import { View, Text } from "@/components/Themed";
import { useRoute } from "@react-navigation/native";
import { Link } from "expo-router";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const DeveloperDetails = [
  {
    cover: require("@/assets/images/ian_pfp.jpg"),
    fullName: "Marc Ian Fuentes",
    email: "@marcianfuentes",
    details:
      "👋 Hi Marc Ian Fuentes, but you can call me Ian, A computer engineering of DEBESMSCAT, designer and builder of the rakebot. Grateful to be a designer of this robot, because I'm an artist too.",
  },

  {
    cover: require("@/assets/images/james_pfp.jpg"),
    fullName: "James Michael Ricare",
    email: "@jamesrecare",
    details:
      "👋 Hi James Michael Ricare but you can call me JM, student of DEBESMSCAT from college of engineering Bachelor of science in Computer Engineering. The programmer of this project  and designer too, grateful to be part of this robot.",
  },
];

export default function DetailScreen() {
  const { id } = useRoute().params as { id: string };
  console.log(useRoute().params);
  const currentDeveloper = DeveloperDetails[id as any];
  return (
    <SafeAreaView
      style={{
        backgroundColor: "white",
        height: "100%",
        paddingHorizontal: 16,
      }}>
      <View style={coverStyle.main}>
        <Image source={currentDeveloper.cover} style={coverStyle.image} />
      </View>

      <View style={{ marginTop: 12 }}>
        <Text style={fontStyle.title}>{currentDeveloper.fullName}</Text>
        <Text style={fontStyle.email}>{currentDeveloper.email}</Text>
      </View>

      <View>
        <Text style={fontStyle.subTitle}>Details</Text>
        <Text style={fontStyle.description}>{currentDeveloper.details}</Text>
      </View>

      <Link href={"/"} asChild>
        <TouchableOpacity
          style={{
            backgroundColor: "black",
            position: "absolute",
            bottom: 0,
            width: "100%",
            margin: 16,
            padding: 16,
            borderWidth: 1,
            borderRadius: 15,
            alignItems: "center",
          }}>
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>
            Back
          </Text>
        </TouchableOpacity>
      </Link>
    </SafeAreaView>
  );
}

const coverStyle = StyleSheet.create({
  main: {
    borderRadius: 15,
    overflow: "hidden",
    height: 300,
    marginTop: 24,
  },

  image: {
    flex: 1,
    width: null,
    resizeMode: "cover",
  },
});

const fontStyle = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },

  subTitle: {
    fontSize: 18,
    fontWeight: "500",
  },

  email: {
    color: "gray",
    fontSize: 16,
    textAlign: "center",
  },

  description: {
    fontSize: 16,
  },
});
