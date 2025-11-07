import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import HomeScreen from "../screens/home.screen";
import RecordScreen from "../screens/record.screen";
import SettingsScreen from "../screens/settings.screen";
import LocationScreen from "../screens/location.screen";

import { useTheme } from "../contexts/theme.context";

const Tab = createBottomTabNavigator();
/* 
  > A pesar de que "Principal", "Historial", "Suscripciones" y "Locacion" son vistas, estas se 
    comportan como componentes dentro del BottomNavigationBar, ya que estas "vistas" no contienen 
    el componente BottomNavigationBar, sino que BottomNavigationBar los contiene a ellos.

  > Esto difiere de Flutter ya que en Flutter el BottomNavigationBar vive dentro de un screen. 
    En React Native vive como una estructura externa que define el flujo de navegación.
*/

export default function BottomNavigator() {
  const { isDark } = useTheme()
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: isDark ? "#ffffffff" : "#000",
        tabBarInactiveTintColor: isDark ? "#979797ff" : "#5c5c5cff",
        tabBarStyle: {
          height: "12%",
          backgroundColor: isDark ? "#434343ff" : "#fff",
        },
        tabBarIcon: ({ color, size = 30 }) => {
          let iconName: keyof typeof Feather.glyphMap = "circle";

          if (route.name === "Principal") iconName = "home";
          else if (route.name === "Historial") iconName = "list";
          else if (route.name === "Ubicacion") iconName = "map-pin";
          else if (route.name === "Configuracion") iconName = "settings";

          return (
            <Feather name={iconName} size={size} color={color} />
          );
        },
      })}
    >
      <Tab.Screen name="Principal" component={HomeScreen} />
      <Tab.Screen name="Historial" component={RecordScreen} />
      <Tab.Screen name="Ubicacion" component={LocationScreen} />
      <Tab.Screen name="Configuracion" component={SettingsScreen} />
    </Tab.Navigator >
  );
}