import React, { createContext, useState, useContext, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginRequest } from "../services/auth.service";
import axios from "axios";

interface AuthContextProps {
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const login = async (email: string, password: string) => {
        try {
            setLoading(true);
            const data = await loginRequest(email, password);
            setToken(data.token);
            await AsyncStorage.setItem("token", data.token); // almacenamiento local del token (AsyncStorage)
            // al hacer login se guarda el idUsusario para futuras peticiones 
            await AsyncStorage.setItem("idUsuario", data.usuario.idUsuario.toString());
            await AsyncStorage.setItem("nombreUsuario", data.usuario.nombres)
            const img_profile = data.usuario.imagen?.nombreArchivo ?? "profile.png";
            await AsyncStorage.setItem("profile", img_profile);
            // Configura el token para futuras peticiones HTTP
            axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`; // <-----------------
        } catch (error: any) {
            // console.error("Error de login:", error.response?.data || error.message);
            throw new Error("Credenciales invalidas o error de conexion");
        } finally {
            setLoading(false);
        }
    };

    // Cerrar sesión
    const logout = async () => {
        setToken(null);
        await AsyncStorage.removeItem("token");
        delete axios.defaults.headers.common["Authorization"]; // <-----------------
    };

    // Cargar token guardado al iniciar la app (opcional)
    React.useEffect(() => {
        const loadToken = async () => {
            const storedToken = await AsyncStorage.getItem("token");
            if (storedToken) {
                setToken(storedToken);
                axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`; // <-----------------
            }
        };
        loadToken();
    }, []);

    const value = {
        token,
        isAuthenticated: !!token,
        loading,
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook personalizado para consumir el contexto
export const useAuth = (): AuthContextProps => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe usarse dentro de un AuthProvider");
    }
    return context;
};
