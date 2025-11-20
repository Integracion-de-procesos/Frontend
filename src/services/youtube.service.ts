import axios from "axios";
import { VideoInterface } from "../types/video.interface";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "https://integracion.test-drive.org/api/youtube";

export const YouTubeService = {
    // Videos mas populares en una locacion
    async obtenerPopulares(): Promise<VideoInterface[]> {
        try {
            // Obtener coordenadas desde AsyncStorage
            const latStr = await AsyncStorage.getItem("latitud");
            const lonStr = await AsyncStorage.getItem("longitud");

            // Validar que existan coordenadas
            if (!latStr || !lonStr) {
                console.warn("Coordenadas no disponibles en AsyncStorage");
                return [];
            }

            // Convertir a número (el backend lo espera así)
            const lat = parseFloat(latStr);
            const lon = parseFloat(lonStr);

            // Llamada HTTP al backend
            const response = await axios.get(`${API_URL}/populares`, {
                params: { lat, lon },
            });

            if (response.data.success && Array.isArray(response.data.data)) {
                return response.data.data.map((video: any): VideoInterface => ({
                    id: video.id,
                    titulo: video.titulo,
                    descripcion: video.descripcion || "",
                    canal: video.canal,
                    miniatura: video.miniatura,
                    vistas: video.vistas?.toString() || "0",
                    likes: video.likes?.toString() || "0",
                    duracion: video.duracion || "",
                    canalImagen: video.canalImagen || "https://placehold.co/100x100",
                    publicado: video.publicado || "00-00-00",
                }));
            }

            return [];
        } catch (error) {
            console.error("Error al obtener videos populares:", error);
            return [];
        }
    },

    async buscarVideos(query: string): Promise<VideoInterface[]> {
        try {
            if (!query || query.trim() === "") {
                throw new Error("Debe ingresar una palabra para buscar videos");
            }

            // Obtener coordenadas desde AsyncStorage
            const latStr = await AsyncStorage.getItem("latitud");
            const lonStr = await AsyncStorage.getItem("longitud");

            // Validar que existan coordenadas
            if (!latStr || !lonStr) {
                console.warn("Coordenadas no disponibles en AsyncStorage");
                return [];
            }

            // Convertir a número (el backend lo espera así)
            const lat = parseFloat(latStr);
            const lon = parseFloat(lonStr);

            const response = await axios.get(`${API_URL}/cercanos`, {
                params: { q: query, lat, lon },
            });

            // Verificar estructura de la respuesta
            if (!response.data?.success || !Array.isArray(response.data.data)) {
                console.warn("Respuesta inesperada del servidor:", response.data);
                return [];
            }

            const videos: VideoInterface[] = response.data.data.map((video: any) => ({
                id: video.id,
                titulo: video.titulo,
                descripcion: video.descripcion || "",
                canal: video.canal,
                miniatura: video.miniatura || null,
                vistas: Number(video.vistas) || 0,
                likes: Number(video.likes) || 0,
                duracion: video.duracion || "",
                canalImagen: video.canalImagen || null,
                publicado: video.publicado || "",
            }));

            return videos;
        } catch (error: any) {
            console.error("Error en buscarVideos:", error.message || error);
            throw new Error("No se pudieron obtener videos del servidor");
        }
    },
};
