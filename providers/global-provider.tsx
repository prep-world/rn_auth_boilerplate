import React, { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

const queryClient = new QueryClient();

interface GlobalProviderProps {
   children: ReactNode;
}

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
   return (
      <QueryClientProvider client={queryClient}>
         {children}
         <Toast />
      </QueryClientProvider>
   );
};
