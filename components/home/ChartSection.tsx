import { LineChart } from "react-native-chart-kit";
import { Text, View } from "../Themed";
import { Dimensions, TouchableOpacity } from "react-native";
import { useAtom, useAtomValue } from "jotai";
import { categoryAtom, connectionAtom } from "@/app/(tabs)";
import { useQuery } from "@tanstack/react-query";
import FirebaseRepository from "@/controllers/firebase.controllers";
import { Link } from "expo-router";

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
  const category = useAtomValue(categoryAtom);

  const weekQuery = useQuery({
    queryFn: async () => {
      const respository = new FirebaseRepository();
      const daysOfWeek = [
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday",
      ];
      const route = category === "Air Humidity" ? "humidity" : category;
      const result = await respository.read(`${route.toLowerCase()}/week`);
      return daysOfWeek.map((day) => result[day]);
    },

    queryKey: ["weeks"],
    enabled: connection === "OFF" ? false : true,
    retry: category === "Timer" ? false : true,
    refetchInterval: category === "Timer" ? false : false,
  });

  const data = {
    labels: ["Mon", "Tue", "Wed", "Thurs", "Fri", "Sat", "Sun"],
    datasets: [{ data: weekQuery?.data || [0, 0, 0, 0, 0, 0], strokeWidth: 2 }],
    legend: ["Result"], // optional
  };

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
      <Link href={"/seismic/123"} asChild>
        <TouchableOpacity className="bg-gray-300  mx-auto px-4 py-2 border-gray-400 mt-2 rounded-full w-[100px] justify-center items-center">
          <Text className="font-semibold">Details</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

{
  /* {category === "Timer" ? (
          <TimeSection />
        ) : (
          <LineChart
            data={(props.data as any) || data}
            width={Dimensions.get("screen").width - 32}
            height={230}
            chartConfig={chartConfig}
            bezier
          />
        )} */
}
