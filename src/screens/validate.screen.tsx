import { Alert, View, Text, TextInput, TouchableOpacity } from "react-native";
import { validateScreenStyles as styles } from "../styles/validate.styles";
import { useTheme } from "../contexts/theme.context";

import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigation";
import { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { enviarCodigo, crearUsuario } from "../services/user.service";
import { useLanguage } from "../contexts/languaje.context";

type ValidateScreenNavigationProp = StackNavigationProp<RootStackParamList, "Validate">;
type ValidateScreenProp = RouteProp<RootStackParamList, "Validate">;

const ValidateScreen: React.FC = () => {
    const route = useRoute<ValidateScreenProp>();
    const navigation = useNavigation<ValidateScreenNavigationProp>();
    const { theme } = useTheme();
    const { t } = useLanguage()
    const [codigo, setCodigo] = useState("");
    const [loading, setLoading] = useState(false);
    const [mensaje, setMensaje] = useState<{ success: boolean; message: string }>({
        success: true,
        message: "",
    });

    const { nombres, apellidos, correoElectronico, telefono, contraseña } = route.params;

    const handleRegister = async () => {
        if (!codigo.trim()) {
            setMensaje({ success: false, message: "Por favor ingresa el codigo" });
            return;
        }
        setLoading(true);
        try {
            const response = await crearUsuario({
                nombres,
                apellidos,
                correoElectronico,
                telefono,
                contraseña,
                codigo,
            });
            if (response.success)
                Alert.alert(t("validate_sucess1"), t("validate_sucess2"), [
                    { text: t("validate_continue"), onPress: () => navigation.navigate("Login") },
                ]);
            else
                setMensaje({ success: response.success, message: response.message });
        } catch (error: any) {
            setMensaje({ success: false, message: "Error al conectar con el servidor" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={[styles.generalContainer, { backgroundColor: theme.background }]}>
            <View style={styles.container}>
                <Text style={[styles.title, { color: theme.text }]}>{t("validate_verify")}</Text>
                <View>
                    <Text style={[styles.subtitle, { color: theme.subtitle }]}>
                        {t("validate_mssgVerify1")}
                    </Text>
                    <Text style={[styles.subtitle, { color: theme.subtitle }]}>
                        {t("validate_mssgVerify2")}
                    </Text>
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        maxLength={6}
                        style={styles.input}
                        keyboardType="number-pad"
                        onChangeText={setCodigo}
                        value={codigo}
                    />
                </View>

                <TouchableOpacity
                    disabled={loading}
                    style={[
                        styles.btnRegister,
                        { backgroundColor: loading ? "#999" : theme.primary },
                    ]}
                    onPress={handleRegister}
                >
                    <Text style={styles.btnRegisterText}>
                        {loading ? t("validate_loading") : t("validate_register")}
                    </Text>
                    <Feather name="arrow-right-circle" size={24} color="#fff" />
                </TouchableOpacity>

                <Text style={[styles.resend, { color: theme.subtitle }]}>
                    {t("validate_noCode")}
                </Text>

                <TouchableOpacity style={styles.btnResend} onPress={async () => {
                    const response = await enviarCodigo({ correoElectronico })
                    setMensaje({
                        success: response.success,
                        message: response.message
                    })
                }}>
                    <Text style={styles.btnResendText}>{t("validate_resendCode")}</Text>
                </TouchableOpacity>

                <View style={styles.messageContainer}>
                    {
                        mensaje.message !== ""
                            ? <Text style={mensaje.success ? styles.success : styles.error}> {mensaje.message} </Text>
                            : null
                    }
                </View>
            </View>
        </View>
    );
};

export default ValidateScreen;
