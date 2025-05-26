import { authorizedAPI, unauthorizedAPI } from "@/utils/api";
import { handleApiRequest } from "@/utils/handleApiRequest";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { router, useSegments } from "expo-router";
import Toast from "react-native-toast-message";
import { useAuthStore } from "../store/useAuthStore";

interface User {
   id: string;
   firstName: string;
   lastName: string;
   email: string;
   role: string;
}

interface LoginData {
   email: string;
   password: string;
}

interface RegisterData {
   firstName: string;
   lastName: string;
   email: string;
   password: string;
}

interface AuthResponse {
   user: User;
   token: string;
}

// API call functions
const loginUser = async (userData: LoginData): Promise<AuthResponse> => {
   const response = await handleApiRequest<AuthResponse>(() =>
      unauthorizedAPI.post("/auth/login", userData)
   );
   if (response.token) {
      await AsyncStorage.setItem("auth_token", response.token);
   }
   return response;
};

const registerUser = async (userData: RegisterData): Promise<AuthResponse> => {
   const response = await handleApiRequest<AuthResponse>(() =>
      unauthorizedAPI.post("/auth/register", userData)
   );
   if (response.token) {
      await AsyncStorage.setItem("auth_token", response.token);
   }
   return response;
};

const getCurrentUser = async (): Promise<User> => {
   return handleApiRequest<User>(() => authorizedAPI.get("/auth/profile"));
};

const logoutUser = async () => {
   // Remove the auth token from storage
   await AsyncStorage.removeItem("auth_token");
   // Clear any API authorization headers
   authorizedAPI.defaults.headers.common["Authorization"] = "";
};

export const useAuth = () => {
   const setUser = useAuthStore((state) => state.setUser);
   const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);
   const queryClient = useQueryClient();
   const segments = useSegments();
   const currentPath = segments[segments.length - 1];
   const isAuthPage = currentPath === "login" || currentPath === "signup";

   const { data, isLoading, refetch } = useQuery<User>({
      queryKey: ["currentUser"],
      queryFn: getCurrentUser,
      enabled: !isAuthPage,
      onSuccess: (data: User) => {
         setUser(data);
         setIsAuthenticated(true);
      },
      onError: () => {
         setUser(null);
         setIsAuthenticated(false);
      },
      retry: false,
   });

   const loginMutation = useMutation<AuthResponse, Error, LoginData>({
      mutationFn: loginUser,
      onSuccess: (data) => {
         setUser(data.user);
         setIsAuthenticated(true);
         queryClient.invalidateQueries({ queryKey: ["currentUser"] });
         if (data.user.role === "ADMIN") {
            router.replace("/admin");
         } else {
            router.replace("/");
         }
      },
      onError: (error) => {
         Toast.show({
            type: "error",
            text1: "Login Failed",
            text2: error.message || "An error occurred",
         });
      },
   });

   const registerMutation = useMutation<AuthResponse, Error, RegisterData>({
      mutationFn: registerUser,
      onSuccess: (data) => {
         setUser(data.user);
         setIsAuthenticated(true);
         queryClient.invalidateQueries({ queryKey: ["currentUser"] });
         router.replace("/");
      },
      onError: (error) => {
         Toast.show({
            type: "error",
            text1: "Registration Failed",
            text2: error.message || "An error occurred",
         });
      },
   });

   const logoutMutation = useMutation({
      mutationFn: async () => {
         await logoutUser();
         await useAuthStore.getState().logout();
      },
      onSuccess: () => {
         setUser(null);
         setIsAuthenticated(false);
         queryClient.clear();
      },
   });

   return {
      user: data,
      loading: isLoading,
      isLogged: !!data && useAuthStore.getState().isAuthenticated,
      login: loginMutation.mutate,
      register: registerMutation.mutate,
      logout: logoutMutation.mutateAsync,
      refetch,
   };
};
