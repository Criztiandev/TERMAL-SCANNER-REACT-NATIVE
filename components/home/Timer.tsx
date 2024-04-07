import { ActivityIndicator, TouchableOpacity } from "react-native";
import { Text, View } from "../Themed";
import { useQuery } from "@tanstack/react-query";
import FirebaseRepository from "@/controllers/firebase.controllers";

const Timer = () => {
  const timerQuery = useQuery({
    queryFn: async () => {
      const respository = new FirebaseRepository();
      const result = await respository.read(`duration`);
      return result;
    },
    queryKey: ["current-timer"],
    refetchInterval: 100,
  });

  if (timerQuery.isLoading)
    return (
      <View className="w-screen h-screen justify-center items-center">
        <ActivityIndicator />
        <Text>Loading</Text>
      </View>
    );

  return (
    <TouchableOpacity onPress={() => {}}>
      <View className="w-[90%] bg-black  mx-auto my-2 h-[300px] border rounded-[5px] flex justify-center items-center ">
        <Text className="text-[32px] font-bold text-white">1 minute</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Timer;
