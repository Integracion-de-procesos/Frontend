import React, { useEffect, useState } from "react";
import { loginScreenStyles as styles } from "../styles/login.styles";
import { validateLogin } from "../utils/validator.util";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigation";
import { useLanguage } from "../contexts/languaje.context";

import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../contexts/theme.context";
import { useAuth } from "../contexts/auth.context";
import GoogleAuthButton from "../components/googleAuth.component";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Login"
>;

const LoginScreen = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const { theme } = useTheme()
  const { loading, login, isAuthenticated } = useAuth()

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { t } = useLanguage()

  const [state, setState] = useState<any>()

  useEffect(() => {
    if (isAuthenticated)
      navigation.navigate("Home");
  }, [isAuthenticated]);

  const standarLoginPress = async () => {
    const error = validateLogin(email, password);
    if (!error) {
      try {
        await login(email, password);
        navigation.navigate("Home");
      } catch (e: any) {
        setErrorMessage(e.message);
      }
    } else {
      setErrorMessage(error);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* mensaje de bienvenida */}
      <Text style={[styles.title, { color: theme.text }]}>
        {t("login_welcome")}
      </Text>
      <Text style={[styles.subtitle, { color: theme.subtitle }]}>
        {t("login_credentials")}
      </Text>

      {/* correo */}
      <Text style={[styles.label, { color: theme.text }]}>
        {t("login_mssgEmail")}
      </Text>
      <TextInput
        placeholder={t("login_email")}
        placeholderTextColor={theme.subtitle}
        style={[styles.input, { color: theme.textInverse }]}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* contraseña */}
      <Text style={[styles.label, { color: theme.text }]}>{t("login_mssgPassword")}</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          placeholder={t("login_password")}
          placeholderTextColor={theme.subtitle}
          secureTextEntry={!passwordVisible}
          style={[styles.passwordInput, { color: theme.textInverse }]}
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          onPress={() => {
            setPasswordVisible((prev) => !prev);
          }}
        >
          <Text style={{ color: theme.text, fontSize: 18 }}>
            {passwordVisible ? "🙈" : "👁️"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* posible mensaje de error */}
      {errorMessage ? (
        <Text style={styles.error}>{errorMessage}</Text>
      ) : null}

      {/*<TouchableOpacity>
        <Text style={[styles.forgotText, { color: theme.primary }]}>
          ¿Olvidaste tu contraseña?
        </Text>
      </TouchableOpacity>*/}

      {/* boton para iniciar */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.primary }]}
        onPress={standarLoginPress}
      >
        <Text style={styles.buttonText}>
          {loading ? t("login_loading") : t("login_startSession")}
        </Text>
      </TouchableOpacity>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginVertical: 40,
        }}
      >
        <View style={{ flex: 1, height: 1, backgroundColor: theme.text }} />
        <Text style={{ marginHorizontal: 10, color: "#000" }}>o</Text>
        <View style={{ flex: 1, height: 1, backgroundColor: theme.text }} />
      </View>

      <GoogleAuthButton
        onLoginSuccess={async (data) => {
          await AsyncStorage.setItem("token", data.token);
          await AsyncStorage.setItem("idUsuario", data.usuario.idUsuario.toString());
          await AsyncStorage.setItem("nombreUsuario", data.usuario.nombres)
          await AsyncStorage.setItem("nombreUsuario", data.usuario.nombres)
          await AsyncStorage.setItem("perfil", data.usuario.rutaImagen);
          // Configura el token para futuras peticiones
          axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
          navigation.navigate("Home")
        }}
      />

      {/* registro */}
      <View style={styles.footerContainer}>
        <Text style={{ color: theme.text }}>{t("login_newUser")}</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Register");
          }}
        >
          <Text style={{ color: theme.primary }}>{t("login_register")}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
