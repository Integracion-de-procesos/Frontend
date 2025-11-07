import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const API_URL = "https://integracion.test-drive.org/api";

// Interfaz de la respuesta del backend
export interface HistorialResponse {
    success: boolean;
    message: string;
}

export const crearHistorial = async (): Promise<HistorialResponse> => {
    try {

        const latitudStr = await AsyncStorage.getItem("latitud");
        const longitudStr = await AsyncStorage.getItem("longitud");
        if (!latitudStr || !longitudStr) {
            throw new Error("Faltan datos de ubicación en AsyncStorage");
        }

        const idUsuarioStr = await AsyncStorage.getItem("idUsuario")
        if (!idUsuarioStr) throw new Error("No se encontró el idUsuario");

        const latitud = Number(latitudStr).toFixed(4);
        const longitud = Number(longitudStr).toFixed(4);
        const idUsuario = parseInt(idUsuarioStr)

        const idHistorial = `${idUsuario}_${latitud}_${longitud}`;
        await AsyncStorage.setItem("idHistorial", idHistorial);

        const guardado = await AsyncStorage.getItem("idHistorial")
        console.log(`Id de Historial generado: ${guardado}`)

        const response = await axios.post(`${API_URL}/historiales`, {
            idUsuario,
            latitud,
            longitud,
        });

        return response.data;
    } catch (error: any) {
        console.error("Error al crear historial:", error.response?.data || error.message);
        return {
            success: false,
            message: "Error al crear historial",
        };
    }
};
