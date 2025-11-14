import axios from "axios";

const API_URL = "https://integracion.test-drive.org/api";

interface Usuario {
    idUsuario: number;
    nombres: string;
    correoElectronico: string;
    imagen: {
        nombreArchivo?: string
    }
}

interface LoginResponse {
    success: boolean;
    mensaje: string;
    token: string;
    usuario: Usuario;
}

interface LogoutResponse {
    success: boolean;
    mensaje: string;
}

export const loginRequest = async (
    email: string,
    password: string
): Promise<LoginResponse> => {
    const response = await axios.post<LoginResponse>(`${API_URL}/login`, {
        correoElectronico: email,
        contraseña: password,
    });
    return response.data;
};

export const logoutRequest = async (
): Promise<LogoutResponse> => {
    const response = await axios.post<LogoutResponse>(`${API_URL}/logout`)
    return response.data;
};