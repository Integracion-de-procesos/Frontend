import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";

import HomeScreen from "../screens/home.screen";
import RecordScreen from "../screens/record.screen";
import SettingsScreen from "../screens/settings.screen";
import LocationScreen from "../screens/location.screen";

import { useLanguage } from "../contexts/languaje.context";
import { useTheme } from "../contexts/theme.context";

const Tab = createBottomTabNavigator();

export default function BottomNavigator() {
  const { isDark } = useTheme();
  const { t } = useLanguage();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: isDark ? "#ffffff" : "#000000",
        tabBarInactiveTintColor: isDark ? "#979797" : "#5c5c5c",
        tabBarStyle: {
          height: "12%",
          backgroundColor: isDark ? "#434343" : "#ffffff",
        },

        tabBarIcon: ({ color, size = 30 }) => {
          let iconName: keyof typeof Feather.glyphMap = "circle";

          if (route.name === "Home") iconName = "home";
          else if (route.name === "Record") iconName = "list";
          else if (route.name === "Location") iconName = "map-pin";
          else if (route.name === "Settings") iconName = "settings";

          return <Feather name={iconName} size={size} color={color} />;
        },
      })}
    >

      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: t("nav_home"),
        }}
      />

      <Tab.Screen
        name="Record"
        component={RecordScreen}
        options={{
          tabBarLabel: t("nav_record"),
        }}
      />

      <Tab.Screen
        name="Location"
        component={LocationScreen}
        options={{
          tabBarLabel: t("nav_location"),
        }}
      />

      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: t("nav_settings"),
        }}
      />
    </Tab.Navigator>
  );
}
