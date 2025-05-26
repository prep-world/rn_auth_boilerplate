import { useAuth } from "@/hooks/useAuth";
import { useAuthStore } from "@/store/useAuthStore";
import { parkingData } from "@/utils/data";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View, Animated, Easing, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


const ProfileScreen: React.FC = () => {
   const { user } = useAuthStore();
   const { logout } = useAuth();
const [isLoggingOut, setIsLoggingOut] = useState(false);
   const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});
   const [rotation] = useState(new Animated.Value(0));

   // Menu items with actual data counts
   const menuItems = [
      {
         icon: "car-outline",
         title: "My Bookings",
         badge: parkingData?.bookings.length || 0,
         content: (
            <View className="p-4 bg-gray-50">
               {parkingData?.bookings.length ? (
                  parkingData?.bookings.map((booking, index) => (
                     <View key={index} className="mb-3">
                        <Text className="font-medium">{booking.parkingName}</Text>
                        <Text className="text-gray-500 text-sm">{booking.location}</Text>
                     </View>
                  ))
               ) : (
                  <Text className="text-gray-500">No vehicles added</Text>
               )}
            </View>
         )
      },
   
      { 
         icon: "heart-outline", 
         title: "Favorites",
         content: (
            <View className="p-4 bg-gray-50">
               <Text className="text-gray-500">No favorites saved</Text>
            </View>
         )
      },
      { 
         icon: "notifications-outline", 
         title: "Notifications",
         content: (
            <View className="p-4 bg-gray-50">
               <Text className="text-gray-500">No new notifications</Text>
            </View>
         )
      },
      { 
         icon: "settings-outline", 
         title: "Settings",
         content: (
            <View className="p-4 bg-gray-50">
               <Text className="text-gray-500">Account settings</Text>
            </View>
         )
      },
      { 
         icon: "help-circle-outline", 
         title: "Help & Support",
         content: (
            <View className="p-4 bg-gray-50">
               <Text className="text-gray-500">Contact support</Text>
            </View>
         )
      },
   ];

   const toggleItem = (index: number) => {
      setExpandedItems(prev => ({
         ...prev,
         [index]: !prev[index]
      }));

      // Animation for the chevron icon
      Animated.timing(rotation, {
         toValue: expandedItems[index] ? 0 : 1,
         duration: 200,
         easing: Easing.linear,
         useNativeDriver: true
      }).start();
   };

   const rotateInterpolation = rotation.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '90deg']
   });

  const handleLogout = async () => {
      setIsLoggingOut(true);
      try {
         await logout();
         router.replace("/login"); 
      } catch (error) {
         console.error("Logout failed:", error);
      } finally {
         setIsLoggingOut(false);
      }
   };

   return (
      <SafeAreaView className="flex-1 bg-gray-50 pb-8">
         <View className="bg-blue-600 pt-12 pb-6 px-4">
            <View className="flex-row justify-between items-center ">
               <Text className="text-white text-xl font-bold">Profile</Text>
               <TouchableOpacity onPress={() => router.push("/settings")}>
                  <Ionicons
                     name="settings-outline"
                     size={24}
                     color="white"
                  />
               </TouchableOpacity>
            </View>
         </View>

         <ScrollView className="flex-1 py-10">
            {/* Profile Card */}
            <View className="bg-white mx-4 -mt-6 rounded-xl p-4 shadow-sm">
               <View className="flex-row items-center">
                  <View className="w-20 h-20 rounded-full bg-blue-100 items-center justify-center">
                     <Text className="text-blue-600 text-2xl font-bold">
                        {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                     </Text>
                  </View>
                  <View className="ml-4 flex-1">
                     <Text className="text-xl font-bold text-gray-800">
                        {user?.firstName} {user?.lastName}
                     </Text>
                     <Text className="text-gray-500">{user?.email}</Text>
                     <Text className="text-gray-500 capitalize">{user?.role?.toLowerCase()}</Text>
                  </View>
                  <TouchableOpacity onPress={() => router.push("/profile/edit")}>
                     <Ionicons
                        name="create-outline"
                        size={24}
                        color="#3b82f6"
                     />
                  </TouchableOpacity>
               </View>
            </View>

            {/* Menu Items */}
            <View className="mt-4 mx-4 bg-white rounded-xl shadow-sm overflow-hidden">
               {menuItems.map((item, index) => (
                  <View key={index}>
                     <TouchableOpacity
                        className={`flex-row items-center p-4 ${
                           index < menuItems.length - 1 && !expandedItems[index]
                              ? "border-b border-gray-100"
                              : ""
                        }`}
                        onPress={() => toggleItem(index)}
                     >
                        <View className="w-10 h-10 rounded-full bg-blue-100 items-center justify-center">
                           <Ionicons
                              name={item.icon}
                              size={20}
                              color="#3b82f6"
                           />
                        </View>
                        <Text className="text-gray-800 font-medium ml-4 flex-1">
                           {item.title}
                        </Text>
                        {item.badge ? (
                           <View className="bg-blue-100 px-2 py-1 rounded-full">
                              <Text className="text-blue-600 font-medium text-xs">
                                 {item.badge}
                              </Text>
                           </View>
                        ) : null}
                        <Animated.View style={{ transform: [{ rotate: expandedItems[index] ? '90deg' : '0deg' }] }}>
                           <Ionicons
                              name="chevron-forward"
                              size={20}
                              color="#9ca3af"
                              className="ml-2"
                           />
                        </Animated.View>
                     </TouchableOpacity>
                     
                     {expandedItems[index] && (
                        <>
                           {item.content}
                           {index < menuItems.length - 1 && (
                              <View className="border-b border-gray-100" />
                           )}
                        </>
                     )}
                  </View>
               ))}
            </View>

            {/* Logout Button */}
            <TouchableOpacity
               className="mx-4 mt-6 mb-20 bg-white py-4 rounded-xl items-center shadow-sm flex-row justify-center"
                onPress={handleLogout}
               disabled={isLoggingOut}
            >{isLoggingOut ? (
                  <ActivityIndicator size="small" color="#ef4444" />
               ) : (
                  <>
                     <Ionicons name="log-out-outline" size={20} color="#ef4444" />
                     <Text className="text-red-500 font-semibold ml-2">Logout</Text>
                  </>
               )}
            </TouchableOpacity>
         </ScrollView>
      </SafeAreaView>
   );
};

export default ProfileScreen;