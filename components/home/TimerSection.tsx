import { Button } from "react-native";
import { View, Text } from "../Themed";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";

export default function TimeSection() {
  return (
    <>
      <CountdownCircleTimer
        isPlaying
        duration={500}
        initialRemainingTime={15}
        colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
        colorsTime={[7, 5, 2, 0]}
        onComplete={() => {
          // do your stuff here
          return { shouldRepeat: true, delay: 1.5 }; // repeat animation in 1.5 seconds
        }}>
        {({ remainingTime }) => <Timer remainingTime={remainingTime} />}
      </CountdownCircleTimer>

      <View className="px-8 py-4 border rounded-md mt-2">
        <Text>Start now</Text>
      </View>
    </>
  );
}

const Timer = ({ remainingTime }: any) => {
  const hours = Math.floor(remainingTime / 3600);
  const minutes = Math.floor((remainingTime % 3600) / 60);
  const seconds = remainingTime % 60;
  return (
    <View>
      <Text>
        {hours}:{minutes}:{seconds}
      </Text>
    </View>
  );
};
