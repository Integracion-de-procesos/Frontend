import React from "react";
/* Librerías para el navigator */
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "./src/types/navigation";

/* Pantallas */
import LoginScreen from "./src/screens/login.screen";
import RegisterScreen from "./src/screens/register.screen";
import BottomNavigator from "./src/components/bottomNavigator.component";
import SelectedVideoCard from "./src/screens/selectedVideoCard.screen";
import GaleryScreen from "./src/screens/galery.screen";
import ValidateScreen from "./src/screens/validate.screen";

/* Contexto global de tema */
import { ThemeProvider } from "./src/contexts/theme.context";
import { AuthProvider } from "./src/contexts/auth.context";
import { RecordProvider } from "./src/contexts/record.context";
import { VideosProvider } from "./src/contexts/videos.context";
import { ProfileProvider } from "./src/contexts/profile.context";
import { LanguageProvider } from "./src/contexts/languaje.context";
import "./src/locale/config"; // inicializa i18next
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'https://bbaf03c0a6de8b1bdf44ea86b8e0144e@o4510343611678720.ingest.de.sentry.io/4510343619018832',

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // Enable Logs
  enableLogs: true,

  // Configure Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [Sentry.mobileReplayIntegration(), Sentry.feedbackIntegration()],

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});

const Stack = createStackNavigator<RootStackParamList>();

export default Sentry.wrap(function App() {
  return (
    <LanguageProvider>
      <ProfileProvider>
        <RecordProvider>
          <AuthProvider>
            <ThemeProvider>
              <VideosProvider>
                <NavigationContainer>
                  <Stack.Navigator
                    initialRouteName="Login"
                    screenOptions={{ headerShown: false }}
                  >
                    {/* Pantallas principales */}
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name="Register" component={RegisterScreen} />
                    <Stack.Screen name="Validate" component={ValidateScreen} />
                    <Stack.Screen name="Home" component={BottomNavigator} />
                    <Stack.Screen name="Galery" component={GaleryScreen} />
                    <Stack.Screen name="SelectedVideo" component={SelectedVideoCard} />
                    
                  </Stack.Navigator>
                </NavigationContainer>
              </VideosProvider>
            </ThemeProvider>
          </AuthProvider>
        </RecordProvider>
      </ProfileProvider>
    </LanguageProvider>

  );
});