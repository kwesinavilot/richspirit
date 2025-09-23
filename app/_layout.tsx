import { useEffect } from 'react';
import { BackHandler, ToastAndroid } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Stack, router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import global CSS file
import "../assets/styles/global.css";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

let backPressCount = 0;
let backPressTimer: number;

export default function RootLayout() {
  const [loaded] = useFonts({
    "Jakarta-Bold": require("../assets/fonts/PlusJakartaSans-Bold.ttf"),
    "Jakarta-ExtraBold": require("../assets/fonts/PlusJakartaSans-ExtraBold.ttf"),
    "Jakarta-ExtraLight": require("../assets/fonts/PlusJakartaSans-ExtraLight.ttf"),
    "Jakarta-Light": require("../assets/fonts/PlusJakartaSans-Light.ttf"),
    "Jakarta-Medium": require("../assets/fonts/PlusJakartaSans-Medium.ttf"),
    "Jakarta-Regular": require("../assets/fonts/PlusJakartaSans-Regular.ttf"),
    "Jakarta-SemiBold": require("../assets/fonts/PlusJakartaSans-SemiBold.ttf"),
  });

  /**
   * Handles the back button press in the app.
   * If the user can go back to a previous page in the app, go there.
   * If the user is at the root level, ask the user to press again to exit the app.
   * If the user presses the back button again within 2 seconds, exit the app.
   * @returns {boolean} true to prevent the default back button behavior
   */
  const handleBackPress = () => {
    // if we can go back to a different page in the app, go there
    if (router.canGoBack()) {
      router.back();
      return true;
    }

    // if we're at the root level, ask the user to press again to exit
    if (backPressCount == 0) {
      ToastAndroid.show("Press back again to exit", ToastAndroid.SHORT);
      backPressCount++;

      backPressTimer = setTimeout(() => {
        backPressCount = 0;
      }, 2000);

      return true;
    }

    // handle second tap within 2 seconds
    clearTimeout(backPressTimer);
    BackHandler.exitApp();
    return true;
  }

  /**
   * Checks if the user has taken the quiz before and routes them to the quizlet screen if not.
   * This function is called when the app is first loaded.
   */
  const checkAndRoute = async () => {
    const takenQuiz = false; //await AsyncStorage.getItem('@richspirit_taken_quiz');

    if (loaded) {
      if (!takenQuiz) {
        router.replace('/(quiz)/welcome');
      } else {
        router.replace('/(actualize)');
      }

      // Hide splash screen after fonts are loaded and routing is complete
      await SplashScreen.hideAsync();
    }
  }

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () => {
      backHandler.remove();
      clearTimeout(backPressTimer);
    }
  }, []);

  useEffect(() => {
    checkAndRoute();
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView>
        <Stack>
          <Stack.Screen name='(quiz)' options={{ headerShown: false }} />
          <Stack.Screen name='(actualize)' options={{ headerShown: false }} />
          {/* <Stack.Screen name="+not-found" /> */}
        </Stack>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
