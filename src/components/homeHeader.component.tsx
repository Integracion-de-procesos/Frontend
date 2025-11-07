import React, { useEffect, useState } from "react";
import { View, TextInput, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import { Feather } from "@expo/vector-icons";
import { homeScreenStyles as styles } from "../styles/home.styles";
import { YouTubeService } from "../services/youtube.service";
import { useVideos } from "../contexts/videos.context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useProfile } from "../contexts/profile.context";
import { useLanguage } from "../contexts/languaje.context";

const HomeHeader = () => {
    const { setVideos } = useVideos(); // Actualiza la lista global
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [profile, setProfile] = useState("");
    const { changed } = useProfile()
    const { t } = useLanguage()

    useEffect(() => {
        const obtenerPerfil = async () => {
            const perfil = await AsyncStorage.getItem("profile");
            setProfile(perfil || "profile.png");
        };
        obtenerPerfil();
    }, [changed]); // cada vez que cambia el contexto

    const handleSearch = async () => {
        if (!query.trim()) return;
        try {
            setLoading(true);
            const resultados = await YouTubeService.buscarVideos(query.trim());
            setVideos(resultados); // Actualiza el contexto global
        } catch (error: any) {
            console.error("Error al buscar videos:", error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.HH_container}>
            <TouchableOpacity>
                <Image
                    source={{ uri: "https://img.icons8.com/color/48/youtube-play.png" }}
                    style={[styles.HH_logo, { shadowColor: "#fff" }]}
                />
            </TouchableOpacity>

            <View style={styles.HH_searchContainer}>

                <Feather name="search" size={20} color="black" />
                <TextInput
                    style={styles.HH_input}
                    placeholder={t("home_searchForVideos")}
                    placeholderTextColor="#888"
                    value={query}
                    onChangeText={setQuery}
                    onSubmitEditing={handleSearch}
                    returnKeyType="search"
                />

                {loading && <ActivityIndicator size="small" color="blue" style={{ marginLeft: 8 }} />}

            </View>

            <TouchableOpacity>
                <Image
                    source={{
                        uri: `https://integracion.test-drive.org/uploads/${profile}`,
                    }}
                    style={[styles.HH_userImage, { backgroundColor: "#fff" }]}
                />
            </TouchableOpacity>
        </View>
    );
};


export default HomeHeader;
