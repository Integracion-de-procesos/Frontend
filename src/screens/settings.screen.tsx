import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, Pressable, Modal, Animated, Easing } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../contexts/theme.context";
import AnimatedToggleSwitch from "../components/animatedTogleSwitch.component";
import { settingsScreenStyles as styles } from "../styles/settings.styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useProfile } from "../contexts/profile.context";
import { useLanguage } from "../contexts/languaje.context";

import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigation";

const SettingsScreen = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const { theme } = useTheme();
    const { changed } = useProfile()
    const { t, lang, setLang } = useLanguage();

    const [profile, setProfile] = useState("");
    const [visible, setVisible] = useState(false);
    const [nombre, setNombre] = useState<string | null>(null);
    const [fadeAnim] = useState(new Animated.Value(0));

    useEffect(() => {
        const obtenerPerfil = async () => {
            const perfil = await AsyncStorage.getItem("profile");
            setProfile(perfil || "profile.png");
        };
        obtenerPerfil();
    }, [changed]); // cada vez que cambia el contexto

    useEffect(() => {
        const obtenerNombre = async () => {
            const nombreUsuario = await AsyncStorage.getItem("nombreUsuario");
            setNombre(nombreUsuario)
        };
        obtenerNombre();
    });

    const toggleMenu = () => {
        if (visible) {
            // Ocultar con animacion
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 150,
                useNativeDriver: true,
                easing: Easing.ease,
            }).start(() => setVisible(false));
        } else {
            // Mostrar con animacion
            setVisible(true);
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
                easing: Easing.ease,
            }).start();
        }
    };

    return (
        <View style={[styles.generalContainer, { backgroundColor: theme.background }]}>
            <View
                style={[
                    styles.headerContainer,
                    { backgroundColor: theme.primary || "#3B62FF" },
                ]}>
                <Image
                    source={{
                        uri: `https://integracion.test-drive.org/uploads/${profile}`,
                    }}
                    style={[styles.profileImage, { backgroundColor: "#fff" }
                    ]} />
                <Text style={[styles.profileName, { color: "#fff" }]}>
                    {nombre}
                </Text>
            </View>

            <ScrollView
                style={styles.contentContainer}
                contentContainerStyle={{ paddingBottom: 40 }}
                showsVerticalScrollIndicator={false}
            >
                <Text style={[styles.sectionTitle, { color: theme.subtitle }]}>
                    {t("settings_menuInfo")}
                </Text>

                <TouchableOpacity
                    style={styles.optionRow}
                    activeOpacity={0.5}
                    onPress={() => navigation.navigate("Galery")}
                >
                    <Text style={[styles.optionText, { color: theme.text }]}>
                        {t("settings_changeProfile")}
                    </Text>
                    <MaterialIcons
                        name="keyboard-arrow-right"
                        size={28}
                        color={theme.subtitle}
                    />
                </TouchableOpacity>

                <View style={styles.optionRow}>
                    <Text style={[styles.optionText, { color: theme.text }]}>
                        {t("settings_changeLanguaje")}
                    </Text>
                    <View>
                        <Pressable style={styles.button} onPress={toggleMenu}>
                            <Text style={styles.text}>
                                {lang === "es" ? "Español" : "English"} ▼
                            </Text>
                        </Pressable>

                        {visible && (
                            <Animated.View
                                style={[styles.menu, { opacity: fadeAnim, transform: [{ scaleY: fadeAnim }] }]}
                            >
                                <Pressable
                                    style={styles.itemButton}
                                    onPress={() => {
                                        setLang("es");
                                        toggleMenu();
                                    }}
                                >
                                    <Text style={styles.item}>Español</Text>
                                </Pressable>

                                <Pressable
                                    style={styles.itemButton}
                                    onPress={() => {
                                        setLang("en");
                                        toggleMenu();
                                    }}
                                >
                                    <Text style={styles.item}>English</Text>
                                </Pressable>
                            </Animated.View>
                        )}
                    </View>
                </View>

                <View style={styles.optionRow}>
                    <Text style={[styles.optionText, { color: theme.text }]}>
                        {t("settings_changeTheme")}
                    </Text>
                    <AnimatedToggleSwitch />
                </View>

                <TouchableOpacity
                    style={[styles.optionRow, styles.logoutRow]}
                    activeOpacity={0.7}
                    onPress={() => navigation.navigate("Login")}
                >
                    <Text style={[styles.optionText, { color: "#fff" }]}>
                        {t("settings_closeSession")}
                    </Text>
                    <MaterialIcons name="exit-to-app" size={26} color="#fff" />
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

export default SettingsScreen;
