import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { VideoInterface } from "../types/video.interface";
import { ReferenciaInterface } from "../types/referencia.interface";

const API_URL = "https://integracion.test-drive.org/api";

export interface ReferenciaResponse {
    success: boolean;
    message: string;
}

export interface ReferenciasResponse {
    success: boolean;
    message: string;
    data?: ReferenciaInterface[];
}

//Crea una referencia de video asociada a un historial guardado en AsyncStorage.

export const crearReferencia = async (
    video: VideoInterface
): Promise<ReferenciaResponse> => {
    try {
        const idHistorial = await AsyncStorage.getItem("idHistorial");
        if (!idHistorial) throw new Error("No se encontró el idHistorial en AsyncStorage");

        const {
            id,
            titulo,
            descripcion,
            canal,
            miniatura,
            vistas,
            likes,
            canalImagen,
            publicado,
        } = video;

        const response = await axios.post<ReferenciaResponse>(
            `${API_URL}/referencias`,
            {
                idHistorial,
                idVideo: id,
                titulo,
                descripcion,
                canal,
                miniatura,
                vistas,
                likes,
                canalImagen,
                publicado,
            }
        );

        return response.data;
    } catch (error: any) {
        console.error("Error al crear referencia de video:", error.response?.data || error.message);
        return {
            success: false,
            message: error.response?.data?.message || "Error al crear la referencia de video",
        };
    }
};

export const getReferenciasPorHistorial = async (): Promise<ReferenciasResponse> => {
    try {
        const idHistorial = await AsyncStorage.getItem("idHistorial");

        if (!idHistorial) {
            console.warn("No se encontró el idHistorial en AsyncStorage");
            return {
                success: true,
                message: "Sin historial guardado todavía.",
                data: [],
            };
        }

        const response = await axios.get<{
            success: boolean;
            message: string;
            data: ReferenciaInterface[];
        }>(`${API_URL}/historiales/${idHistorial}/referencias`);

        if (
            !response.data ||
            !Array.isArray(response.data.data) ||
            response.data.data.length === 0
        ) {
            console.info("No hay referencias aún en este historial.");
            return {
                success: true,
                message: "No se encontraron referencias para este historial.",
                data: [],
            };
        }
        return {
            success: true,
            message: response.data.message,
            data: response.data.data,
        };
    } catch (error: any) {
        return {
            success: false,
            message: error.response?.data?.message || "Error al obtener referencias del servidor.",
            data: [],
        };
    }
};
