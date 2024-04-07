import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";

import { useColorScheme } from "@/components/useColorScheme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { View } from "@/components/Themed";
import { Button, Image, Text, TouchableOpacity } from "react-native";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const [isAppReady, setIsAppReady] = useState(false);
  const colorScheme = useColorScheme();
  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>
      {isAppReady ? (
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
        </ThemeProvider>
      ) : (
        <SplashScreenComponent value={isAppReady} setter={setIsAppReady} />
      )}
    </QueryClientProvider>
  );
}

const SplashScreenComponent = ({ value, setter }: any) => {
  return (
    <View className="w-full h-full justify-center items-center">
      <View className="  rounded-full bg-gray-400">
        <Image source={require("@/assets/images/logo.jpg")} />
      </View>

      <Text className="text-[32px] font-bold my-4">Rake Bot Machine</Text>
      <TouchableOpacity onPress={() => setter(!value)} className="mt-[32px]">
        <Text className="font-bold py-2 justify-center items-center rounded-full bg-[#2ecc71] text-white text-[24px] px-[42px]">
          Start
        </Text>
      </TouchableOpacity>
    </View>
  );
};
