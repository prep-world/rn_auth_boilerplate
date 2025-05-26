import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "./global.css";
import { GlobalProvider } from "@/providers/global-provider";
import { useProtectedRoute } from "@/providers/auth-provider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuthStore } from "@/store/useAuthStore";

export default function RootLayout() {
   const [fontsLoaded] = useFonts({
      "Rubik-Bold": require("../assets/fonts/Rubik-Bold.ttf"),
      "Rubik-ExtraBold": require("../assets/fonts/Rubik-ExtraBold.ttf"),
      "Rubik-Light": require("../assets/fonts/Rubik-Light.ttf"),
      "Rubik-Medium": require("../assets/fonts/Rubik-Medium.ttf"),
      "Rubik-Regular": require("../assets/fonts/Rubik-Regular.ttf"),
      "Rubik-SemiBold": require("../assets/fonts/Rubik-SemiBold.ttf"),
   });

   const [isReady, setIsReady] = useState(false);
   const { isAuthenticated, setIsAuthenticated } = useAuthStore();

   useEffect(() => {
      const initializeAuth = async () => {
         const token = await AsyncStorage.getItem("auth_token");
         if (token) {
            setIsAuthenticated(true);
         }
         setIsReady(true);
      };
      initializeAuth();
   }, []);

   useProtectedRoute(fontsLoaded && isReady); // Only allow navigation when everything is ready

   useEffect(() => {
      if (fontsLoaded && isReady) {
         SplashScreen.hideAsync();
      }
   }, [fontsLoaded, isReady]);

   if (!fontsLoaded || !isReady) {
      return null;
   }

   return (
      <GlobalProvider>
         <Stack screenOptions={{ headerShown: false }} />
      </GlobalProvider>
   );
}