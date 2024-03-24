import { Dimensions } from "react-native";
import { View, Text } from "../Themed";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import FontAwesome from "@expo/vector-icons/FontAwesome";

interface Props {
  value: any;
}

export default function ProgressChart(props: Props) {
  return (
    <View>
      <AnimatedCircularProgress
        size={175}
        width={30}
        fill={props?.value}
        children={() => (
          <Text style={{ fontSize: 32, fontWeight: "bold" }}>
            {props.value ? (
              <>
                <Text style={{ fontWeight: "bold" }}>{props.value}</Text>
                <FontAwesome name="percent" style={{ fontSize: 32 }} />
              </>
            ) : (
              "N/A"
            )}
          </Text>
        )}
        tintColor="#9D1C1C"
        // onAnimationComplete={() => console.log("onAnimationComplete")}
        backgroundColor="#D2DDDF"
        fillLineCap="round"
        style={{
          margin: 24,
        }}
      />
    </View>
  );
}
