import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import * as SecureStore from 'expo-secure-store';

import { useColorScheme } from '@/components/useColorScheme';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { tokenCache } from '@clerk/clerk-expo/token-cache';

const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

// Cache the Clerk JWT
// const tokenCache = {
//   async getToken(key: string) {
//     try {
//       return SecureStore.getItemAsync(key);
//     } catch (err) {
//       return null;
//     }
//   },
//   async saveToken(key: string, value: string) {
//     try {
//       return SecureStore.setItemAsync(key, value);
//     } catch (err) {
//       return;
//     }
//   },
// };

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
    'mon': require('../assets/fonts/Montserrat-Regular.ttf'),
    'mon-sb': require('../assets/fonts/Montserrat-SemiBold.ttf'),
    'mon-b': require('../assets/fonts/Montserrat-Bold.ttf'),
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

  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY!} tokenCache={tokenCache}>
      <RootLayoutNav />
    </ClerkProvider>
  );
}

function RootLayoutNav() {
  const { isLoaded, isSignedIn } = useAuth();
  // const colorScheme = useColorScheme();
  const router = useRouter();

  // Automatically open login if user is not authenticated
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/(modals)/login');
    }
  }, [isLoaded]);

  return (
    <Stack>
    <Stack.Screen
      name="(modals)/login"
      options={{
        presentation: 'modal',
        title: 'Log in or sign up',
        headerTitleStyle: {
          fontFamily: 'mon-sb',
        },
        headerLeft: () => (
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="close-outline" size={28} />
          </TouchableOpacity>
        ),
      }}
    />
    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    <Stack.Screen name="listing/[id]" options={{ headerTitle: '' }} />
    <Stack.Screen
      name="(modals)/booking"
      options={{
        presentation: 'transparentModal',
        animation: 'fade',
        headerTransparent: true,
        // headerTitle: (props) => <ModalHeaderText />,
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => router.back()}
            style={{
              backgroundColor: '#fff',
              borderColor: Colors.grey,
              borderRadius: 20,
              borderWidth: 1,
              padding: 4,
            }}>
            <Ionicons name="close-outline" size={22} />
          </TouchableOpacity>
        ),
      }}
    />
  </Stack>
  );
}
