import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import {Stack, useRouter} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import {TouchableOpacity} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faXmark} from "@fortawesome/pro-regular-svg-icons";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'montserrat': require('../assets/fonts/Montserrat-Regular.ttf'),
    'montserrat-sb': require('../assets/fonts/Montserrat-SemiBold.ttf'),
    'montserrat-b': require('../assets/fonts/Montserrat-Bold.ttf'),
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
  const router = useRouter();

  return (
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(modals)/login" options={{
          presentation: "modal",
          title: "Log In",
          headerTitleStyle: {
            fontFamily: "monserrat-sb"
          },
          headerLeft : () => (
            <TouchableOpacity onPress={() => {router.back()}}>
              <FontAwesomeIcon icon={faXmark} size={28} />
            </TouchableOpacity>
          )
        }} />
        <Stack.Screen name="listing/[id]" options={{
          headerTitle: "",
        }} />
        <Stack.Screen name="(modals)/booking" options={{
          headerTitle: "",
          animation: 'fade',
          presentation: 'transparentModal',
          headerLeft : () => (
              <TouchableOpacity onPress={() => {router.back()}}>
                <FontAwesomeIcon icon={faXmark} size={28} />
              </TouchableOpacity>
          )
        }} />
      </Stack>
  );
}
