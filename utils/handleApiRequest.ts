import { AxiosError } from "axios";
import Toast from "react-native-toast-message";

export const handleApiRequest = async <T>(
   request: () => Promise<{ data: T }>
): Promise<T> => {
   try {
      const response = await request();
      return response.data;
   } catch (error) {
      if (error instanceof AxiosError) {
         const message = error.response?.data?.message || "An error occurred";
         Toast.show({
            type: "error",
            text1: "Error",
            text2: message,
         });
      }
      throw error;
   }
};
