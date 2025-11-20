import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import mime from 'mime/lite';

const API_URL = "https://integracion.test-drive.org/api/images";

interface SubirImagenResponse {
    success: boolean;
    message: string;
    rutaImagen: string;
}

export const subirImagen = async (imageUri: string): Promise<SubirImagenResponse> => {
    try {
        const idUsuario = await AsyncStorage.getItem("idUsuario");
        if (!idUsuario) {
            throw new Error("No se encontró el idUsuario en AsyncStorage");
        }

        const formData = new FormData();
        formData.append("idUsuario", idUsuario);
        formData.append("image", {
            uri: imageUri,
            name: imageUri.split("/").pop(),
            type: mime.getType(imageUri) || "image/jpeg",
        } as any);

        const response = await axios.post(`${API_URL}/subir`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return {
            success: response.data.success,
            message: response.data.message,
            rutaImagen: response.data.data.rutaImagen
        };
    } catch (error: any) {
        console.error("Error al subir la imagen:", error.message);
        throw new Error("No se pudieron obtener videos del servidor");
    }
};