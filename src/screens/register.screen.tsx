import React, { useState } from "react";
import { useTheme } from "../contexts/theme.context";
import { validateRegister } from "../utils/validator.util";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigation";
import { useLanguage } from "../contexts/languaje.context";

import { registerStyles } from "../styles/register.styles";
import { enviarCodigo } from "../services/user.service";

type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList, "Register">;

const RegisterScreen = () => {
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const { theme } = useTheme();

  const [apellidos, setApellidos] = useState("");
  const [nombres, setNombres] = useState("");
  const [correoElectronico, setcorreoElectronico] = useState("");
  const [telefono, setTelefono] = useState("");
  const [contraseña, setcontraseña] = useState("");

  const [confirm, setConfirm] = useState("");
  const [contraseñaVisible, setcontraseñaVisible] = useState(false);
  const [recontraseñaVisible, setRecontraseñaVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { t } = useLanguage()

  const handleRegister = async () => {
    try {
      const error = validateRegister(nombres, correoElectronico, contraseña, confirm);
      if (error) {
        setErrorMessage(error);
        return;
      }
      const response = await enviarCodigo({ correoElectronico });
      if (!response.success) {
        setErrorMessage(response.message);
        return;
      }
      navigation.navigate("Validate", {
        nombres,
        apellidos,
        correoElectronico,
        telefono,
        contraseña,
      });
    } catch (error: any) {
      setErrorMessage(error.message || "Ocurrio un error inesperado");
    }
  };

  return (
    <View style={[registerStyles.container, { backgroundColor: theme.background }]}>
      <Text style={[registerStyles.title, { color: theme.text }]}>{t("register_title")}</Text>
      <Text style={[registerStyles.subtitle, { color: theme.text }]}>
        {t("register_subtitle")}
      </Text>
      <TextInput
        style={[registerStyles.input, { color: theme.textInverse }]}
        placeholder={t("register_names")}
        placeholderTextColor="#999"
        value={nombres}
        onChangeText={setNombres}
      />
      <TextInput
        style={[registerStyles.input, { color: theme.textInverse }]}
        placeholder={t("register_surnames")}
        placeholderTextColor="#999"
        value={apellidos}
        onChangeText={setApellidos}
      />
      <TextInput
        style={[registerStyles.input, { color: theme.textInverse }]}
        placeholder={t("register_email")}
        placeholderTextColor="#999"
        value={correoElectronico}
        onChangeText={setcorreoElectronico}
        keyboardType="email-address"
      />
      <TextInput
        style={[registerStyles.input, { color: theme.textInverse }]}
        placeholder={t("register_number")}
        placeholderTextColor="#999"
        value={telefono}
        onChangeText={setTelefono}
        keyboardType="phone-pad"
      />
      <View style={registerStyles.passwordContainer}>
        <TextInput
          style={[registerStyles.passwordInput, { color: theme.textInverse }]}
          placeholder={t("register_password")}
          placeholderTextColor="#999"
          value={contraseña}
          onChangeText={setcontraseña}
          secureTextEntry={!contraseñaVisible}
        />
        <TouchableOpacity onPress={() => setcontraseñaVisible(!contraseñaVisible)}>
          <Text style={{ color: theme.primary }}>
            {contraseñaVisible ? "🙈" : "👁️"}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={registerStyles.passwordContainer}>
        <TextInput
          style={[registerStyles.passwordInput, { color: theme.textInverse }]}
          placeholder={t("register_confirmation")}
          placeholderTextColor="#999"
          value={confirm}
          onChangeText={setConfirm}
          secureTextEntry={!recontraseñaVisible}
        />
        <TouchableOpacity onPress={() => setRecontraseñaVisible(!recontraseñaVisible)}>
          <Text style={{ color: theme.primary }}>
            {recontraseñaVisible ? "🙈" : "👁️"}
          </Text>
        </TouchableOpacity>
      </View>

      {errorMessage ? (
        <Text style={{ color: "red", marginVertical: 10 }}>{errorMessage}</Text>
      ) : null}

      <TouchableOpacity
        style={[registerStyles.button, { backgroundColor: theme.primary }]}
        onPress={handleRegister}>
        <Text style={registerStyles.buttonText}>{t("register_register")}</Text>
      </TouchableOpacity>

      <View style={registerStyles.footerContainer}>
        <Text style={{ color: theme.text }}>{t("register_alreadyAcount")} </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={{ color: theme.primary, fontWeight: "bold" }}>
            {t("register_login")}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterScreen;
