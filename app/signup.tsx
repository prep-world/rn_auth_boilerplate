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
const registerSchema = z.object({
   firstName: z.string()
      .min(1, "First name is required")
      .min(2, "First name must be at least 2 characters"),
   lastName: z.string()
      .min(1, "Last name is required")
      .min(2, "Last name must be at least 2 characters"),
   email: z.string()
      .min(1, "Email is required")
      .email("Please enter a valid email address"),
   password: z.string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters")
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Password must contain at least one uppercase letter, one lowercase letter, and one number"),
   confirmPassword: z.string()
      .min(1, "Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
   message: "Passwords don't match",
   path: ["confirmPassword"],
});

type RegisterFormData = z.infer<typeof registerSchema>;

const SignupScreen: React.FC = () => {
   const [showPassword, setShowPassword] = useState(false);
   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
   const { register, loading, isLogged } = useAuth();

   const {
      control,
      handleSubmit,
      formState: { errors, isValid },
   } = useForm<RegisterFormData>({
      resolver: zodResolver(registerSchema),
      mode: "onChange", // Real-time validation
      defaultValues: {
         firstName: "",
         lastName: "",
         email: "",
         password: "",
         confirmPassword: "",
      },
   });

   if (!loading && isLogged) return <Redirect href="/" />;

   const onSubmit = async (data: RegisterFormData) => {
      try {
         // Don't send confirmPassword to backend
         const { confirmPassword, ...registrationData } = data;
         await register(registrationData);
      } catch (error) {
         console.error("Registration failed:", error);
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
            <View className="flex-1 justify-center px-8 py-10 bg-gray-50">
               <StatusBar style="dark" />
               <View className="items-center mb-8">
                  <Image
                     source={logo}
                     className="w-20 h-20"
                     resizeMode="contain"
                  />
                  <Text className="text-2xl font-bold text-blue-700 mt-4">
                     Create Account
                  </Text>
                  <Text className="text-gray-500 text-center mt-2">
                     Sign up to start parking smarter
                  </Text>
               </View>

               <View className="space-y-4">
                  {/* First Name Field */}
                  <View>
                     <Text className="text-gray-700 font-medium mb-2">
                        First Name
                     </Text>
                     <Controller
                        control={control}
                        name="firstName"
                        render={({ field: { onChange, onBlur, value } }) => (
                           <TextInput
                              className={`bg-white py-3 px-4 rounded-lg border ${
                                 errors.firstName ? "border-red-500" : "border-gray-300"
                              }`}
                              value={value}
                              onChangeText={onChange}
                              onBlur={onBlur}
                              placeholder="Enter your first name"
                              autoCapitalize="words"
                           />
                        )}
                     />
                     {errors.firstName && (
                        <Text className="text-red-500 text-sm mt-1">
                           {errors.firstName.message}
                        </Text>
                     )}
                  </View>

                  {/* Last Name Field */}
                  <View>
                     <Text className="text-gray-700 font-medium mb-2">
                        Last Name
                     </Text>
                     <Controller
                        control={control}
                        name="lastName"
                        render={({ field: { onChange, onBlur, value } }) => (
                           <TextInput
                              className={`bg-white py-3 px-4 rounded-lg border ${
                                 errors.lastName ? "border-red-500" : "border-gray-300"
                              }`}
                              value={value}
                              onChangeText={onChange}
                              onBlur={onBlur}
                              placeholder="Enter your last name"
                              autoCapitalize="words"
                           />
                        )}
                     />
                     {errors.lastName && (
                        <Text className="text-red-500 text-sm mt-1">
                           {errors.lastName.message}
                        </Text>
                     )}
                  </View>

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
                                 placeholder="Create a password"
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

                  {/* Confirm Password Field */}
                  <View>
                     <Text className="text-gray-700 font-medium mb-2">
                        Confirm Password
                     </Text>
                     <View className="relative">
                        <Controller
                           control={control}
                           name="confirmPassword"
                           render={({ field: { onChange, onBlur, value } }) => (
                              <TextInput
                                 className={`bg-white py-3 px-4 pr-12 rounded-lg border ${
                                    errors.confirmPassword ? "border-red-500" : "border-gray-300"
                                 }`}
                                 value={value}
                                 onChangeText={onChange}
                                 onBlur={onBlur}
                                 placeholder="Confirm your password"
                                 secureTextEntry={!showConfirmPassword}
                              />
                           )}
                        />
                        <TouchableOpacity
                           className="absolute right-3 top-3"
                           onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                           <Ionicons
                              name={showConfirmPassword ? "eye-off" : "eye"}
                              size={20}
                              color="#6B7280"
                           />
                        </TouchableOpacity>
                     </View>
                     {errors.confirmPassword && (
                        <Text className="text-red-500 text-sm mt-1">
                           {errors.confirmPassword.message}
                        </Text>
                     )}
                  </View>

                  <TouchableOpacity
                     onPress={handleSubmit(onSubmit)}
                     disabled={loading || !isValid}
                     className={`py-4 rounded-lg items-center mt-4 ${
                        loading || !isValid ? "bg-gray-400" : "bg-blue-600"
                     }`}
                  >
                     <Text className="text-white font-bold text-lg">
                        {loading ? "Creating Account..." : "Create Account"}
                     </Text>
                  </TouchableOpacity>

                  <View className="flex-row justify-center mt-4">
                     <Text className="text-gray-600">
                        Already have an account?{" "}
                     </Text>
                     <TouchableOpacity>
                        <Link
                           href="/login"
                           className="text-blue-600 font-bold"
                        >
                           Log In
                        </Link>
                     </TouchableOpacity>
                  </View>
               </View>
            </View>
         </ScrollView>
      </KeyboardAvoidingView>
   );
};

export default SignupScreen;