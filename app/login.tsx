import { Link, Redirect } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
   Image,
   KeyboardAvoidingView,
   Platform,
   ScrollView,
   Text,
   TextInput,
   TouchableOpacity,
   View,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../hooks/useAuth";

const logo = require("../assets/images/logo.png");

// Zod validation schema
const loginSchema = z.object({
   email: z.string()
      .min(1, "Email is required")
      .email("Please enter a valid email address"),
   password: z.string()
      .min(1, "Password is required")
      .min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginScreen: React.FC = () => {
   const [showPassword, setShowPassword] = useState(false);
   const { login, loading, isLogged } = useAuth();

   const {
      control,
      handleSubmit,
      formState: { errors, isValid },
   } = useForm<LoginFormData>({
      resolver: zodResolver(loginSchema),
      mode: "onChange", // Real-time validation
      defaultValues: {
         email: "",
         password: "",
      },
   });

   if (!loading && isLogged) return <Redirect href="/" />;

   const onSubmit = async (data: LoginFormData) => {
      try {
         await login(data);
      } catch (error) {
         console.error("Login failed:", error);
      }
   };

   return (
      <KeyboardAvoidingView
         behavior={Platform.OS === "ios" ? "padding" : "height"}
         style={{ flex: 1 }}
         keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
      >
         <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
         >
            <View className="flex-1 justify-center px-8 bg-gray-50">
               <StatusBar style="dark" />
               <View className="items-center mb-10">
                  <Image
                     source={logo}
                     className="w-24 h-24"
                     resizeMode="contain"
                  />
                  <Text className="text-3xl font-bold text-blue-700 mt-4">
                     ParkEasy
                  </Text>
                  <Text className="text-gray-500 text-center mt-2">
                     Find and reserve parking spots with ease
                  </Text>
               </View>

               <View className="space-y-4">
                  {/* Email Field */}
                  <View>
                     <Text className="text-gray-700 font-medium mb-2">Email</Text>
                     <Controller
                        control={control}
                        name="email"
                        render={({ field: { onChange, onBlur, value } }) => (
                           <TextInput
                              className={`bg-white py-3 px-4 rounded-lg border ${
                                 errors.email ? "border-red-500" : "border-gray-300"
                              }`}
                              value={value}
                              onChangeText={onChange}
                              onBlur={onBlur}
                              placeholder="Enter your email"
                              keyboardType="email-address"
                              autoCapitalize="none"
                           />
                        )}
                     />
                     {errors.email && (
                        <Text className="text-red-500 text-sm mt-1">
                           {errors.email.message}
                        </Text>
                     )}
                  </View>

                  {/* Password Field */}
                  <View>
                     <Text className="text-gray-700 font-medium mb-2">
                        Password
                     </Text>
                     <View className="relative">
                        <Controller
                           control={control}
                           name="password"
                           render={({ field: { onChange, onBlur, value } }) => (
                              <TextInput
                                 className={`bg-white py-3 px-4 pr-12 rounded-lg border ${
                                    errors.password ? "border-red-500" : "border-gray-300"
                                 }`}
                                 value={value}
                                 onChangeText={onChange}
                                 onBlur={onBlur}
                                 placeholder="Enter your password"
                                 secureTextEntry={!showPassword}
                              />
                           )}
                        />
                        <TouchableOpacity
                           className="absolute right-3 top-3"
                           onPress={() => setShowPassword(!showPassword)}
                        >
                           <Ionicons
                              name={showPassword ? "eye-off" : "eye"}
                              size={20}
                              color="#6B7280"
                           />
                        </TouchableOpacity>
                     </View>
                     {errors.password && (
                        <Text className="text-red-500 text-sm mt-1">
                           {errors.password.message}
                        </Text>
                     )}
                  </View>

                  <TouchableOpacity>
                     <Text className="text-blue-600 text-right">
                        Forgot Password?
                     </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                     onPress={handleSubmit(onSubmit)}
                     disabled={loading || !isValid}
                     className={`py-4 rounded-lg items-center mt-4 ${
                        loading || !isValid ? "bg-gray-400" : "bg-blue-600"
                     }`}
                  >
                     <Text className="text-white font-bold text-lg">
                        {loading ? "Logging in..." : "Login"}
                     </Text>
                  </TouchableOpacity>

                  <View className="flex-row justify-center my-4">
                     <Text className="text-gray-600">Don't have an account? </Text>
                     <TouchableOpacity>
                        <Link
                           href="/signup"
                           className="text-blue-600 font-bold"
                        >
                           Sign Up
                        </Link>
                     </TouchableOpacity>
                  </View>
               </View>
            </View>
         </ScrollView>
      </KeyboardAvoidingView>
   );
};

export default LoginScreen;