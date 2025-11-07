import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, Alert } from "react-native";
import ListVideosCards from "../components/listVideosCards.component";
import Header from "../components/homeHeader.component";
import { homeScreenStyles as styles } from "../styles/home.styles";
import { YouTubeService } from "../services/youtube.service";
import { useTheme } from "../contexts/theme.context";
import { useRecord } from "../contexts/record.context";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useVideos } from "../contexts/videos.context";
import { useLanguage } from "../contexts/languaje.context";

const HomeScreen: React.FC = () => {
  const { videos, setVideos } = useVideos();
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage()

  const { theme } = useTheme();
  const { generarId } = useRecord();

  // Cargar ubicacion y videos solo al montar
  useEffect(() => {
    let activo = true;

    const obtenerUbicacionYCargar = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        // Denegacion de permiso
        if (status !== "granted") {
          Alert.alert(t("home_deny1"),t("home_deny2"));
          if (activo) setLoading(false);
          return;
        }

        const ubicacion = await Location.getCurrentPositionAsync({});
        const coords = {
          latitud: ubicacion.coords.latitude.toFixed(4),
          longitud: ubicacion.coords.longitude.toFixed(4),
        };

        await AsyncStorage.setItem("latitud", coords.latitud);
        await AsyncStorage.setItem("longitud", coords.longitud);

        await generarId();

        setLoading(true);
        const data = await YouTubeService.obtenerPopulares();
        if (activo) setVideos(data);

      } catch (error) {
        Alert.alert(t("home_error1"), t("home_error2"));
      } finally {
        if (activo) setLoading(false);
      }
    };
    obtenerUbicacionYCargar();
    return () => {
      activo = false;
    };
  }, []);


  return (
    <View style={[styles.HS_generalContainer, { backgroundColor: theme.background }]}>

      <Header />

      {loading ? (
        <ActivityIndicator size="large" color={theme.text} style={{ marginTop: 40 }} />
      ) : (
        <ListVideosCards videos={videos} />
      )}
    </View>
  );
};

export default HomeScreen;
