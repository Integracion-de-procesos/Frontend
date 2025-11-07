import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import mime from 'mime/lite';

const API_URL = "https://integracion.test-drive.org/api/images";

interface SubirImagenResponse {
    success: boolean;
    message: string;
    nombreArchivo?: string;
}

export const eliminarImagen = async () => {
    try {
        const idUsuario = await AsyncStorage.getItem("idUsuario");
        if (!idUsuario) {
            throw new Error("No se encontró el idUsuario en AsyncStorage");
        }
        const response = await axios.delete(`${API_URL}/${idUsuario}`);
        return {
            success: true,
            message: response.data?.message || "Imagen eliminada correctamente.",
        };
    } catch (error: any) {
        return {
            success: false,
            message:
                error.response?.data?.message || "Error al eliminar la imagen del servidor.",
        };
    }
};

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
            nombreArchivo: response.data.data.nombreArchivo
        };
    } catch (error: any) {
        return {
            success: false,
            message:
                error.response?.data?.message ||
                "Error al subir la imagen al servidor."
        };
    }
};