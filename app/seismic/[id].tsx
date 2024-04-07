import { View } from "@/components/Themed";
import FirebaseRepository from "@/controllers/firebase.controllers";
import { useQuery } from "@tanstack/react-query";
import { useAtom, useAtomValue } from "jotai";
import { useState } from "react";
import { Dimensions, SafeAreaView } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { categoryAtom, connectionAtom } from "../(tabs)";
import { getCurrentDay } from "@/utils/date.utils";

const chartConfig = {
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  strokeWidth: 1,
  barPercentage: 0.5,
  decimalPlaces: 2,
  style: {
    borderRadius: 16,
    backgroundColor: "#000",
  },
};

export default function DetailScreen() {
  const [currentData, setCurrentData] = useState<any>([0, 0, 0, 0, 0, 0, 0]);
  const currentDay = getCurrentDay();

  const connection = useAtomValue(connectionAtom);
  const category = useAtomValue(categoryAtom);

  const weekQuery = useQuery({
    queryFn: async () => {
      const respository = new FirebaseRepository();
      const result = await respository.read(
        `${category.toLowerCase()}/week/Thursday
        }`
      );

      setCurrentData((prevNumbers: Array<number>) => {
        const newNumbers = prevNumbers.map((number: number) => {
          return number === null ? result : Number(number);
        });

        // Check if all slots are filled with actual data
        const allFilled = newNumbers.every((number) => number !== null);

        if (allFilled) {
          newNumbers.shift();
          newNumbers.push(result);
        }

        return newNumbers;
      });

      return [];
    },

    queryKey: ["tuesday"],
    enabled: connection === "OFF" ? false : true,
    refetchInterval: 500,
  });

  const data = {
    datasets: [
      {
        data: currentData,
      },
      { data: [1] },
      { data: [100] },
    ],
    legend: ["Result"], // optional
  };

  return (
    <SafeAreaView className="w-screen h-screen bg-white">
      <View className="p-4 rounded-md overflow-hidden">
        <LineChart
          data={data as any}
          width={Dimensions.get("screen").width - 32}
          height={230}
          chartConfig={chartConfig}
          yAxisInterval={1} // optional, defaults to 1
          bezier
        />
      </View>
    </SafeAreaView>
  );
}
