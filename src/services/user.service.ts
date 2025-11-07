import axios from "axios"
import { UserInterface } from "../types/user.interface"

const API_URL = "https://integracion.test-drive.org/api/usuarios"

export interface CreateResponse {
    success: boolean
    message: string
    data?: {
        idUsuario: number
        nombres: string
        correoElectronico: string
    }
}

export interface SendResponse {
    success: boolean;
    message: string;
}

export const crearUsuario = async (
    data: UserInterface
): Promise<CreateResponse> => {
    try {
        const response = await axios.post<CreateResponse>(API_URL, data, {
            headers: {
                "Content-Type": "application/json",
            },
        })

        return response.data
    } catch (error: any) {
        const message = error.response?.data?.message || "Error de red o servidor no disponible.";
        return {
            success: false,
            message,
        };
    }
}

export const enviarCodigo = async (
    data: {
        correoElectronico: string
    }
): Promise<SendResponse> => {
    try {
        const response = await axios.post<SendResponse>(`${API_URL}/enviar`, data, {
            headers: {
                "Content-Type": "application/json",
            },
        })
        return response.data
    } catch (error: any) {
        const message = error.response?.data?.message || "Error de red o servidor no disponible.";
        return {
            success: false,
            message,
        };
    }
};