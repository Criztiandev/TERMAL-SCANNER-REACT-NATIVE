import { LineChart } from "react-native-chart-kit";
import { Text, View } from "../Themed";
import { Dimensions, TouchableOpacity } from "react-native";
import { useAtom, useAtomValue } from "jotai";
import { categoryAtom, connectionAtom } from "@/app/(tabs)";
import { useQuery } from "@tanstack/react-query";
import FirebaseRepository from "@/controllers/firebase.controllers";
import { Link } from "expo-router";
import { days } from "@/data/date.data";

interface DataPayload {
  labels: Array<string>;
  datesets: any;
  legend: Array<string>;
}

interface Props {
  data?: DataPayload;
}

const chartConfig = {
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // White color for lines
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // White color for labels
  strokeWidth: 1, // optional, default 3
  barPercentage: 0.5,
  style: {
    borderRadius: 16,
    backgroundColor: "#000", // Black background color
  },
};

export default function ChartSection() {
  const connection = useAtomValue(connectionAtom);
  const currentCategory = useAtomValue(categoryAtom);
  const currentPath = `/${
    currentCategory === "Air Humidity"
      ? "humidity"
      : currentCategory.toLowerCase()
  }/SeismicGraph`;

  const weekQuery = useQuery({
    queryFn: async () => {
      const respository = new FirebaseRepository();
      const route =
        currentCategory === "Air Humidity" ? "humidity" : currentCategory;
      const result = await respository.read(`${route.toLowerCase()}/week`);
      return days.map((day) => result[day.toLowerCase()]);
    },

    queryKey: ["weeks"],
    enabled: connection === "OFF" ? false : true,
    retry: currentCategory === "Timer" ? false : true,
    refetchInterval: currentCategory === "Timer" ? false : false,
  });

  const data = {
    labels: ["Mon", "Tue", "Wed", "Thurs", "Fri", "Sat", "Sun"],
    datasets: [{ data: weekQuery?.data || [0, 0, 0, 0, 0, 0], strokeWidth: 2 }],
    legend: ["Result"], // optional
  };

  console.log(currentCategory);

  return (
    <View className="">
      <View className="w-full h-[275px] px-4 pt-4 overflow-hidden rounded-md mb-2">
        <View className=" border h-full w-full rounded-md overflow-hidden mb-24 flex justify-center items-center">
          <LineChart
            data={data}
            width={Dimensions.get("screen").width - 32}
            height={230}
            chartConfig={chartConfig}
            bezier
          />
        </View>
      </View>
      <Link href={currentPath as any} asChild>
        <TouchableOpacity className="bg-gray-300  mx-auto px-4 py-2 border-gray-400 mt-2 rounded-full w-[100px] justify-center items-center">
          <Text className="font-semibold">Details</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}
