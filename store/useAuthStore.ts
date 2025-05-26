import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

interface User {
   id: string;
   firstName: string;
   lastName: string;
   email: string;
   role: string;
}

interface AuthState {
   user: User | null;
   isAuthenticated: boolean;
   setUser: (user: User | null) => void;
   setIsAuthenticated: (isAuthenticated: boolean) => void;
   logout: () => Promise<void>;
   redirectBasedOnRole: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
   user: null,
   isAuthenticated: false,
   setUser: (user) => set({ user }),
   setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
   logout: async () => {
      await AsyncStorage.removeItem("auth_token");
      set({ user: null, isAuthenticated: false });
      router.replace("/login");
   },
   redirectBasedOnRole: () => {
      const { user } = useAuthStore.getState();
      if (user?.role === "ADMIN") {
         router.replace("/admin");
      } else {
         router.replace("/(tabs)");
      }
   },
}));
