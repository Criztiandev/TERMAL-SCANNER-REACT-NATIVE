import { Link } from "expo-router";
import { TouchableOpacity } from "react-native";
import { Text } from "../Themed";

export default function HomeButton() {
  return (
    <Link href={"/"} asChild>
      <TouchableOpacity
        className="bg-black border my-4 rounded-full px-8 py-4"
        onPress={() => {}}>
        <Text className="text-white text-center font-bold text-[18px]">
          Go Back
        </Text>
      </TouchableOpacity>
    </Link>
  );
}
