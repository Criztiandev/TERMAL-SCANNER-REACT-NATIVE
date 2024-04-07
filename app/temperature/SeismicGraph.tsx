import { View, Text } from "@/components/Themed";
import FirebaseRepository from "@/controllers/firebase.controllers";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect, useState } from "react";
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
import { Fontisto } from "@expo/vector-icons/";
import HomeButton from "@/components/buttons/BackButton";
import {
  tempActivationAtom,
  temperatureTimerAtom,
} from "@/service/states/feature.atom";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

const DayBadge = ({ currentDay, payloadDay }: any) => {
  return (
    <View
      className={`border px-4 py-2 rounded-full mr-4 ${
        currentDay === payloadDay ? "bg-black" : "bg-transparent"
      } `}>
      <Text
        className={`font-bold ${
          currentDay === payloadDay ? "text-white" : "text-black"
        }`}>
        {payloadDay}
      </Text>
    </View>
  );
};

const Activation = () => {
  const [isActive, setIsActive] = useState(false);
  const repository = new FirebaseRepository();
  const setTempActivation = useSetAtom(tempActivationAtom);
  const connection = useAtomValue(connectionAtom);

  useQuery({
    queryFn: async () => {
      if (connection === "OFF") return false;
      const result = await repository.read("temperature/timer");
      setIsActive(result);
      return result;
    },
    queryKey: ["temperature-activation1"],
  });

  const activateMutation = useMutation({
    mutationFn: async () => {
      return await repository.update("/temperature", {
        active: !isActive,
      });
    },
    mutationKey: ["tempActive"],
    onSuccess: () => {
      setTempActivation(isActive);
    },
    onError: (e: Error) => {
      console.log(e.message);
    },
  });

  const toggleActivation = () => {
    if (connection === "OFF") return;
    setIsActive(!isActive);
    activateMutation.mutateAsync();
  };

  return (
    <TouchableOpacity
      className={`flex-1 mr-4 border rounded-md ${
        isActive === true
          ? "border-green-400 bg-green-100 "
          : "border-red-400 bg-red-100"
      }`}
      onPress={toggleActivation}
      disabled={activateMutation.isPending}>
      <View className="m-2 bg-transparent flex justify-center items-center h-full">
        <Fontisto name="radio-btn-active" size={48} className="mb-2" />
        <Text className="bg-transparent text-[18px] font-bold mt-2">
          {isActive === true ? "Activated" : "Deactivated"}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const TimerDeactivation = () => {
  const [date, setDate] = useState(new Date(1598051730000));
  const setTimerAtom = useSetAtom(temperatureTimerAtom);

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const showMode = (currentMode: any) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showTimepicker = () => {
    showMode("time");
  };

  const activationQuery = useQuery({
    queryFn: async () => {
      const repository = new FirebaseRepository();
      const result = await repository.read("moisture/timer");
      setTimerAtom(result);
      setDate(new Date(result));
      return result;
    },
    queryKey: ["moisture-timer"],
  });

  var formattedDate =
    ("0" + date?.getHours()).slice(-2) +
    ":" +
    ("0" + date?.getMinutes()).slice(-2);

  return (
    <TouchableOpacity
      className="flex-1  border rounded-md"
      onPress={showTimepicker}>
      <View className="h-full flex justify-center items-center overflow-hidden">
        <Text className="text-[18px] font-bold">6:00 PM</Text>
      </View>
    </TouchableOpacity>
  );
};

const DetailScreen = () => {
  const activation = useAtomValue(tempActivationAtom);
  const [currentData, setCurrentData] = useState([0, 0, 0, 0, 0, 0]);
  const currentDay = getCurrentDay();
  const connection = useAtomValue(connectionAtom);

  const currentNumber = useQuery({
    queryFn: async () => {
      const respository = new FirebaseRepository();
      const result = await respository.read(`temperature/week/${currentDay}`);
      console.log("Fucking Result", result);
      setCurrentData((prevNumbers) => {
        const newNumbers = prevNumbers.map((number) =>
          number === null ? result : Number(number)
        );

        const allFilled = newNumbers.every((number) => number !== null);

        if (allFilled) {
          newNumbers.shift();
          newNumbers.push(result);
        }

        return newNumbers;
      });

      return result;
    },
    queryKey: ["current-temperature"],
    enabled: activation === true && connection === "ON",
    refetchInterval: 1,
  });

  useEffect(() => {
    // If activation is false, reset currentData to 0
    if (!activation) {
      setCurrentData([0, 0, 0, 0, 0, 0]);
    }
  }, [activation]);

  const data = {
    datasets: [{ data: currentData }, { data: [1] }, { data: [100] }],
  };

  return (
    <SafeAreaView className="w-screen h-screen bg-white">
      <Text className="text-bold text-[24px] font-bold  text-center my-4">
        Temperature
      </Text>
      <View
        className={`${
          activation === true && connection === "ON"
            ? "bg-green-200 border border-green-400"
            : "bg-red-200 border border-red-400"
        } px-4 py-1 rounded-full mr-4 min-w-[100px] justify-center items-center mx-auto `}>
        <Text className={`font-bold text-[18px] `}>
          {Number(currentNumber.data)}
        </Text>
      </View>

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
            <DayBadge
              key={item.index}
              currentDay={currentDay}
              payloadDay={item.item}
            />
          )}
        />

        <Text className="font-bold text-lg my-4">Configuration</Text>
        <View className="h-[150px] flex-row">
          <Activation />
          <TimerDeactivation />
        </View>
        <HomeButton />
      </View>
    </SafeAreaView>
  );
};

export default DetailScreen;
