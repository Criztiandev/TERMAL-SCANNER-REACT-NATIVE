import { useAtom } from "jotai";
import { Text, View } from "../Themed";
import { categoryAtom, connectionAtom } from "@/app/(tabs)";

export default function HeaderSection() {
  const [connection] = useAtom(connectionAtom);
  const [category] = useAtom(categoryAtom);

  return (
    <View className="mt-12">
      <Text className="text-2xl font-bold text-center mb-2">{category}</Text>
      <Text
        className={`px-4 py-[4px] border w-[100px] rounded-full text-center mx-auto font-semibold ${
          connection === "OFF"
            ? "bg-red-200 border-red-400"
            : "bg-green-200 border-green-400"
        }`}>
        {connection}
      </Text>
    </View>
  );
}
