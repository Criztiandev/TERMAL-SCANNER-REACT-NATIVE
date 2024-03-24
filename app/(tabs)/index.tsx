import { StatusBar, SafeAreaView, ScrollView } from "react-native";
import CategorySection from "@/components/home/CategorySection";
import ChartSection from "@/components/home/ChartSection";
import HeaderSection from "@/components/home/HeaderSection";
import { atom, useAtom, useSetAtom } from "jotai";
import { useQuery } from "@tanstack/react-query";
import FirebaseRepository from "@/controllers/firebase.controllers";
import { Text, View } from "@/components/Themed";

export const connectionAtom = atom("OFF");
export const categoryAtom = atom("Temperature");

export default function RootScreen() {
  const [_, setConnection] = useAtom(connectionAtom);

  const connectionQuery = useQuery({
    queryFn: async () => {
      const repository = new FirebaseRepository();
      const result = await repository.read("connection");
      setConnection(result);
      return result;
    },
    queryKey: ["connection"],
    refetchInterval: 500,
  });

  if (connectionQuery.isLoading)
    return (
      <View>
        <Text>Loading</Text>
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
      <ChartSection />
      <CategorySection />
    </SafeAreaView>
  );
}
