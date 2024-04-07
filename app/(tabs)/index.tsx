import {
  StatusBar,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import CategorySection from "@/components/home/CategorySection";
import ChartSection from "@/components/home/ChartSection";
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { useQuery } from "@tanstack/react-query";
import FirebaseRepository from "@/controllers/firebase.controllers";
import { Text, View } from "@/components/Themed";
import HeaderSection from "@/components/home/HeaderSection";
import Timer from "@/components/home/Timer";

export const connectionAtom = atom("OFF");
export const categoryAtom = atom("Temperature");

export default function RootScreen() {
  const currentCategory = useAtomValue(categoryAtom);
  const [_, setConnection] = useAtom(connectionAtom);

  const connectionQuery = useQuery({
    queryFn: async () => {
      const repository = new FirebaseRepository();
      const result = await repository.read("connection");
      setConnection(result);
      return result;
    },
    queryKey: [""],
    refetchInterval: 500,
  });

  if (connectionQuery.isLoading)
    return (
      <View className="w-full h-full flex justify-center items-center">
        <ActivityIndicator />
        <Text className="">Loading.....</Text>
      </View>
    );

  return (
    <SafeAreaView className="h-screen w-screen bg-white">
      <StatusBar
        backgroundColor="black"
        barStyle="default"
        showHideTransition="fade"
      />
      <HeaderSection />
      {currentCategory === "Timer" ? <Timer /> : <ChartSection />}
      <CategorySection />
    </SafeAreaView>
  );
}
