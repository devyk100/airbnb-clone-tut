import { ClerkProvider } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SecureStore from "expo-secure-store"
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { TouchableOpacity, useColorScheme } from 'react-native';
import 'react-native-reanimated';

// import { useColorScheme } from 

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
    // SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    "mon": require("../assets/fonts/Montserrat-Regular.ttf"),
    "mon-b": require("../assets/fonts/Montserrat-Bold.ttf"),
    "mon-sb": require("../assets/fonts/Montserrat-SemiBold.ttf"),
    "mon-l": require("../assets/fonts/Montserrat-Thin.ttf"),
    // ...FontAwesome.font,
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

const tokenCache = {
  async getToken(key: string){
    try{
      return SecureStore.getItemAsync(key);
    }
    catch(error){
      return null;
    }
  },
  async saveToken(key: string, value: string):Promise<void>{
    try{
      return SecureStore.setItemAsync(key,value);
    }
    catch(error){
      console.error(error)
      return;
    }
  }
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ClerkProvider publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!} tokenCache={tokenCache}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{
          animation:  "fade_from_bottom"
        }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name='(modals)/login' options={{
            title: "Login to your account",
            headerTitleStyle: {
              fontFamily: "mon"
            },
            presentation: "modal",
            // headerLeft: ({tintColor}) => {
            //   return (
            //     <>
            //     <TouchableOpacity>
            //       <Ionicons name='close-outline' color={tintColor} size={25}/>
            //     </TouchableOpacity>
            //     </>
            //   )
            // }
          }} />
          <Stack.Screen name='(modals)/booking' options={{
            presentation: "transparentModal",
            animation: "fade"
          }} />
          <Stack.Screen name='listing/[id]' options={{
            headerTitle: ""
          }} />
        </Stack>
      </ThemeProvider>
    </ClerkProvider>
  );
}
