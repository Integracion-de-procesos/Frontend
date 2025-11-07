import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { crearHistorial } from "../services/record.service";

interface RecordContextProps {
    generarId: () => Promise<void>;
}

const RecordContext = createContext<RecordContextProps | undefined>(undefined);

interface RecordProviderProps {
    children: ReactNode;
}

/*
    La principal funcion de este contexto es realizar la llamada al service para la 
    creacion de de las intancias de Historial
*/

export const RecordProvider = ({ children }: RecordProviderProps) => {

    // Función que genera el idHistorial
    const generarId = async () => {
        try {
            await crearHistorial()
        } catch (error) {
            console.error("Error al generar idHistorial:", error);
        }
    };

    return (
        <RecordContext.Provider value={{ generarId }}>
            {children}
        </RecordContext.Provider>
    );
};

export const useRecord = () => {
    const context = useContext(RecordContext);
    if (!context) {
        throw new Error("useRecord debe usarse dentro de un RecordProvider");
    }
    return context;
};
