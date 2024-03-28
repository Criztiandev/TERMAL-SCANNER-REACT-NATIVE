import FontAwesome from "@expo/vector-icons/FontAwesome6";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { FlatList, View, Text, TouchableOpacity } from "react-native";
import { useAtom } from "jotai";
import { categoryAtom } from "@/app/(tabs)";

const Categories = [
  {
    id: "0",
    title: "Temperature",
    key: "temperature",
    icon: <FontAwesome name="temperature-half" size={48} />,
  },
  {
    id: "1",
    title: "Air Humidity",
    key: "humidity",
    icon: <Entypo name="air" size={48} />,
  },
  {
    id: "2",
    title: "Moisture",
    key: "moisture",
    icon: <MaterialIcons name="water-drop" size={48} />,
  },
  {
    id: "3",
    title: "Timer",
    key: "timer",
    icon: <MaterialIcons name="timer" size={48} />,
  },
];

export default function CategorySection() {
  const [category, setCategory] = useAtom(categoryAtom);

  const toggleSelectCategory = (selected: any) => {
    setCategory(selected);
  };
  return (
    <View className=" p-4">
      <Text className="text-xl font-semibold mb-2">Categories</Text>
      <FlatList
        data={Categories}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => toggleSelectCategory(item.title)}
            className="flex-1 h-[130px] ">
            <View
              className={`flex-1  h-full rounded-[5px] p-2 justify-center items-center ${
                category === item.title
                  ? "opacity-100 bg-gray-50 border-2 border-gray-400"
                  : "opacity-50"
              }`}>
              {item.icon}
              <Text className="text-xl font-semibold mt-2">{item.title}</Text>
            </View>
          </TouchableOpacity>
        )}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}
