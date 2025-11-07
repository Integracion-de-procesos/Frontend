import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Alert, TouchableOpacity, Text, ActivityIndicator } from "react-native";
import { WebView } from "react-native-webview";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRecord } from "../contexts/record.context";

import { useVideos } from "../contexts/videos.context";
import { YouTubeService } from "../services/youtube.service";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigation";
import { useLanguage } from "../contexts/languaje.context";

const GOOGLE_MAPS_API_KEY = "AIzaSyC9Is7c2eMdrPRtY1nuUopZH-hoYRJZ3YA";

type LocationScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    "Location"
>;

const LocationScreen: React.FC = () => {
    //const navigation = useNavigation<LocationScreenNavigationProp>();
    const webViewRef = useRef<WebView>(null);
    const [selectedCoords, setSelectedCoords] = useState<{ lat: number; lng: number } | null>(null);
    const [initialCoords, setInitialCoords] = useState<{ lat: number; lng: number } | null>(null);
    const [loading, setLoading] = useState(true);
    const { generarId } = useRecord()
    const { setVideos } = useVideos()
    const { t } = useLanguage()

    // Carga de coordenadas en almacenamiento local
    useEffect(() => {
        const loadCoords = async () => {
            const latitud = await AsyncStorage.getItem("latitud");
            const longitud = await AsyncStorage.getItem("longitud");
            console.log(`Latitud almacenada : ${latitud} / Longitud almacenada: ${longitud}`)
            if (latitud && longitud) {
                setInitialCoords({
                    lat: parseFloat(latitud),
                    lng: parseFloat(longitud),
                });
            } else {
                // CDMX
                setInitialCoords({ lat: 19.4326, lng: -99.1332 });
            }

            setLoading(false);
        };
        loadCoords();
    }, []);

    // Coordenadas desde el mapa
    const handleMessage = (event: any) => {
        try {
            const data = JSON.parse(event.nativeEvent.data);
            if (data.type === "map_click") {
                const { lat, lng } = data.payload;
                setSelectedCoords({ lat, lng });
            }
        } catch (error) {
            console.error("Error al procesar mensaje del mapa:", error);
        }
    };

    // Almacenamiento de coordenadas seleccionadas
    const handleShowLocation = async () => {
        if (!selectedCoords) {
            Alert.alert(t("location_alertError1"), t("location_alertError2"));
            return;
        }
        const { lat, lng } = selectedCoords;
        await AsyncStorage.setItem("latitud", lat.toFixed(4));
        await AsyncStorage.setItem("longitud", lng.toFixed(4));
        generarId()
        const videos = await YouTubeService.obtenerPopulares()
        setVideos(videos)
        Alert.alert(t("location_alertSuccess"));
    };

    if (loading || !initialCoords) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#007AFF" />
                <Text>{t("location_loadingMap")}</Text>
            </View>
        );
    }

    // Buscador
    const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no" />
            <style>
                html, body, #map { height: 100%; margin: 0; padding: 0; }
                #search-box {
                    position: absolute;
                    top: 6%; left: 50%; transform: translateX(-50%);
                    width: 80%; z-index: 5; background: white; border-radius: 4px;
                    padding: 6px; box-shadow: 0 2px 6px rgba(0,0,0,0.3);
                    font-size: 16px;
                }
            </style>
            <script>
                function initMap() {
                    const initial = { lat: ${initialCoords.lat}, lng: ${initialCoords.lng} };

                    const map = new google.maps.Map(document.getElementById('map'), {
                        center: initial,
                        zoom: 13,
                    });

                    const marker = new google.maps.Marker({
                        position: initial,
                        map,
                        title: "Ubicacion inicial",
                    });

                    // CLIC MANUAL DEL MAPA

                    map.addListener("click", (event) => {
                        const lat = event.latLng.lat();
                        const lng = event.latLng.lng();
                        marker.setPosition(event.latLng);
                        window.ReactNativeWebView.postMessage(JSON.stringify({
                            type: "map_click",
                            payload: { lat, lng }
                        }));
                    });

                    // AUTOCOMPLETADO DE DIRECCIONES
                    const input = document.getElementById("search-box");
                    const autocomplete = new google.maps.places.Autocomplete(input, {
                        fields: ["geometry", "formatted_address", "name", "place_id"],
                    });
                    autocomplete.bindTo("bounds", map);

                    autocomplete.addListener("place_changed", () => {
                        const place = autocomplete.getPlace();
                        if (!place || !place.geometry || !place.geometry.location) {
                            alert("${t("location_errorOfSearch")}");
                            return;
                        }

                        const lat = place.geometry.location.lat();
                        const lng = place.geometry.location.lng();

                        // Centrar mapa en el lugar
                        if (place.geometry.viewport) {
                            map.fitBounds(place.geometry.viewport);
                        } else {
                            map.setCenter(place.geometry.location);
                            map.setZoom(15);
                        }

                        // Mover marcador
                        marker.setPosition(place.geometry.location);

                        // Enviar coordenadas a RN
                        window.ReactNativeWebView.postMessage(JSON.stringify({
                            type: "map_click",
                            payload: { lat, lng }
                        }));
                    });

                    // Evitar recarga con Enter
                    input.addEventListener("keydown", (e) => {
                        if (e.key === "Enter") e.preventDefault();
                    });
                }
            </script>

            <script src="https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places&callback=initMap" defer></script>
        </head>

        <body>
            <input id="search-box" type="text" placeholder="${t("location_mssgInput")}" />
            <div id="map"></div>
        </body>
        </html>
    `;

    return (
        <View style={styles.container}>
            <WebView
                ref={webViewRef}
                originWhitelist={["*"]}
                source={{ html: htmlContent }}
                onMessage={handleMessage}
                javaScriptEnabled
                domStorageEnabled
                style={styles.webview}
            />

            <TouchableOpacity style={styles.button} onPress={handleShowLocation}>
                <Text style={styles.buttonText}>{t("location_mssgButton")}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    webview: { flex: 1 },
    loaderContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    button: {
        backgroundColor: "#007AFF",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        margin: 16,
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
    },
});

export default LocationScreen;
