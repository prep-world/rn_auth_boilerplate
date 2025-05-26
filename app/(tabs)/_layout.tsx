import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const TabIcon = ({
   focused,
   name,
}: {
   focused: boolean;
   name: keyof typeof Ionicons.glyphMap;
}) => {
   return (
      <Ionicons
         name={name}
         size={24}
         color={focused ? "#0061FF" : "#666876"}
      />
   );
};

const TabsLayout = () => {
   return (
      <Tabs
         screenOptions={{
            tabBarShowLabel: false,
            tabBarStyle: {
               backgroundColor: "white",
               position: "absolute",
               borderTopColor: "#0061FF1A",
               borderTopWidth: 1,
               minHeight: 70,
            },
         }}
      >
         <Tabs.Screen
            name="index"
            options={{
               title: "Home",
               headerShown: false,
               tabBarIcon: ({ focused }) => (
                  <TabIcon
                     focused={focused}
                     name="home-outline"
                  />
               ),
            }}
         />
         <Tabs.Screen
            name="explore"
            options={{
               title: "Explore",
               headerShown: false,
               tabBarIcon: ({ focused }) => (
                  <TabIcon
                     focused={focused}
                     name="compass-outline"
                  />
               ),
            }}
         />
        
         <Tabs.Screen
            name="profile"
            options={{
               title: "Profile",
               headerShown: false,
               tabBarIcon: ({ focused }) => (
                  <TabIcon
                     focused={focused}
                     name="person-outline"
                  />
               ),
            }}
         />
      
      </Tabs>
   );
};

export default TabsLayout;
