import React from "react";
import { TouchableOpacity, Text, ActivityIndicator, View, Image } from "react-native";
import { useGoogleAuth } from "../hooks/googleAuth.hook";
import { googleLoginRequest } from "../services/auth.service";
import { googleStyles as styles } from "../styles/googleButton.styles";
import { useTheme } from "../contexts/theme.context";

interface Props {
    onLoginSuccess?: (data: any) => void;
}

const GoogleAuthButton: React.FC<Props> = ({ onLoginSuccess }) => {
    const { signIn, loading, error } = useGoogleAuth();
    const { theme } = useTheme();

    const handlePress = async () => {
        const googleData = await signIn();
        if (!googleData) return;

        const idToken = googleData.idToken;
        if (!idToken) return;
        
        const backendResponse = await googleLoginRequest(idToken);

        // Entrega la sesion completa a quien use el boton
        if (backendResponse.success && onLoginSuccess) {
            onLoginSuccess(backendResponse);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.button}
                onPress={handlePress}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <View style={styles.content}>
                        <Image
                            source={require("../../assets/google.png")}
                            style={styles.icon}
                        />
                        <Text style={[styles.text, { color: theme.text }]}>
                            Iniciar sesión con Google
                        </Text>
                    </View>
                )}
            </TouchableOpacity>

            {error && <Text style={styles.error}>{error}</Text>}
        </View>
    );
};

export default GoogleAuthButton;
