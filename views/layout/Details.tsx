import { View, Text } from "@/components/Themed";
import FirebaseRepository from "@/controllers/firebase.controllers";
import { useQuery } from "@tanstack/react-query";
import { useAtom, useAtomValue } from "jotai";
import { useState } from "react";
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import { getCurrentDay } from "@/utils/date.utils";
import { days } from "@/data/date.data";
import { chartConfig } from "@/data/chart.data";
import { connectionAtom } from "@/app/(tabs)";

interface Props {
  label: string;
}

export default function DetailScreen({ label }: Props) {
  const currentDay = getCurrentDay();
  const connection = useAtomValue(connectionAtom);

  const featureQuery = useQuery({
    queryFn: async () => {},
    queryKey: [""],
    enabled: connection === "OFF" ? false : true,
  });

  const data = {
    datasets: [{ data: featureQuery.data }, { data: [1] }, { data: [20] }],
  };

  return (
    <SafeAreaView className="w-screen h-screen bg-white">
      <Text className="text-bold text-[24px] font-bold  text-center my-4">
        {label}
      </Text>

      <View className="p-4 rounded-md overflow-hidden">
        <LineChart
          data={data as any}
          width={Dimensions.get("screen").width - 32}
          height={250}
          chartConfig={chartConfig}
          yAxisInterval={1}
          bezier
          style={{ borderRadius: 10 }}
        />

        <FlatList
          data={days}
          className="py-4"
          horizontal
          renderItem={(item) => (
            <View
              className={`border px-4 py-2 rounded-full mr-4  ${
                currentDay === item.item ? "bg-black" : "bg-transparent"
              } `}>
              <Text
                className={`font-bold ${
                  currentDay === item.item ? "text-white" : "text-black"
                }`}>
                {item.item}
              </Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}
