import { Text, View } from "@/components/Themed";
import { Link } from "expo-router";
import { TouchableOpacity, StyleSheet, Image } from "react-native";

const InfoCard = ({
  id,
  name,
  cover,
  course,
}: {
  id: number;
  name: string;
  cover: string;
  course: string;
}) => {
  return (
    <Link href={`/info/${id}`} asChild>
      <TouchableOpacity>
        <View style={style.card}>
          <View style={coverStyle.cover}>
            <Image
              source={cover || require("@/assets/images/james_pfp.jpg")}
              style={coverStyle.cover}
            />
          </View>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "800",
              color: "white",
              marginVertical: 12,
            }}>
            {name}
          </Text>
          <Text style={{ color: "gray", fontSize: 18, fontWeight: "600" }}>
            {course}
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default InfoCard;

const style = StyleSheet.create({
  card: {
    width: "100%",
    borderWidth: 1,
    borderColor: "black",

    height: 250,
    marginVertical: 16,
    borderRadius: 15,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
});

const coverStyle = StyleSheet.create({
  cover: {
    width: 120,
    height: 120,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "black",
  },
});
