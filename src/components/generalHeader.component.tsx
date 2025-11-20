import React, { useEffect, useState } from "react";
import {
    View,
    TouchableOpacity,
    Image,
    Text,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigation";
import { useTheme } from "../contexts/theme.context";
import { generalHeaderStyles as styles } from "../styles/generalHeader.styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useProfile } from "../contexts/profile.context";

type GeneralHeaderProps = {
    screen: string
};

const GeneralHeader = ({ screen }: GeneralHeaderProps) => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const { theme } = useTheme()
    const [profile, setProfile] = useState<string | null>(null);
    const { changed } = useProfile()

    useEffect(() => {
        const obtenerPerfil = async () => {
            const perfil = await AsyncStorage.getItem("perfil");
            setProfile(perfil);
        };
        obtenerPerfil();
    }, [changed]); // cada vez que cambia el contexto

    return (
        <View style={styles.GH_header}>
            <View style={styles.GH_container}>
                <TouchableOpacity onPress={navigation.goBack}>
                    <Feather name="arrow-left" size={24} color={theme.text} />
                </TouchableOpacity>

                <Text style={[styles.GH_title, { color: theme.text }]}>{screen}</Text>

                <Image
                    source={{ uri: `${profile}` }}
                    style={[styles.GH_userImage, { backgroundColor: "#fff" }]}
                />
            </View>
        </View>
    );
};


export default GeneralHeader;
