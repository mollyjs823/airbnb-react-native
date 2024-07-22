import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import {ClerkLoaded, useAuth} from "@clerk/clerk-expo";
import {Stack, useRouter} from 'expo-router';
import {TouchableOpacity} from "react-native";
import {ClerkProvider} from "@clerk/clerk-expo";
import * as SplashScreen from 'expo-splash-screen';
import * as SecureStore from 'expo-secure-store';
import 'react-native-reanimated';

import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faXmark} from "@fortawesome/pro-regular-svg-icons";


const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

// Cache Clerk JWT
const tokenCache = {
    async getToken(key: string) {
        try {
            return SecureStore.getItemAsync(key);
        } catch (err) {
            return null;
        }
    },
    async saveToken(key: string, value: string) {
        try {
            return SecureStore.setItemAsync(key, value);
        } catch (err) {
            return;
        }
    }
}

if (!CLERK_PUBLISHABLE_KEY) {
    throw new Error('Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env')
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'montserrat': require('../assets/fonts/Montserrat-Regular.ttf'),
    'montserrat-sb': require('../assets/fonts/Montserrat-SemiBold.ttf'),
    'montserrat-b': require('../assets/fonts/Montserrat-Bold.ttf'),
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

  return (
       <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY!} tokenCache={tokenCache}>
           <ClerkLoaded>
                <RootLayoutNav />
           </ClerkLoaded>
       </ClerkProvider>
   );
}

function RootLayoutNav() {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
        router.push('/(modals)/login');
    }
  }, [isLoaded]);

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
            headerTransparent: true,
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
