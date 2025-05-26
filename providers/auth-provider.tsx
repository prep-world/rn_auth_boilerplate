import { useAuthStore } from "@/store/useAuthStore";
import { useRouter, useSegments } from "expo-router";
import { useEffect } from "react";

export function useProtectedRoute(isAppReady: boolean) {
   const segments = useSegments();
   const router = useRouter();
   const { isAuthenticated, user } = useAuthStore();

   useEffect(() => {
      if (!isAppReady) return; // Don't navigate if app isn't ready
      
      const currentPath = segments[segments.length - 1];
      const isAuthPage = currentPath === "login" || currentPath === "signup";

      if (!isAuthenticated && !isAuthPage) {
         router.replace("/login");
      } else if (isAuthenticated && isAuthPage) {
         router.replace("/");
      }
   }, [isAuthenticated, segments, user, isAppReady]);
}