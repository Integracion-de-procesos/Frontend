import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "../locale/config";
import { useTranslation } from "react-i18next";

interface LanguageContextProps {
    lang: string;
    setLang: (lang: string) => Promise<void>;
    t: (key: string, options?: Record<string, any>) => string;
}

const LanguageContext = createContext<LanguageContextProps>({
    lang: "es",
    setLang: async () => { },
    t: (key) => key,
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const { t } = useTranslation();
    const [lang, setLangState] = useState(i18n.language || "es");

    // Cargar idioma guardado
    useEffect(() => {
        (async () => {
            const storedLang = await AsyncStorage.getItem("appLanguage");
            if (storedLang && storedLang !== i18n.language) {
                await i18n.changeLanguage(storedLang);
                setLangState(storedLang);
            }
        })();
    }, []);

    // Cambiar idioma y guardar en AsyncStorage
    const setLang = async (newLang: string) => {
        await i18n.changeLanguage(newLang);
        await AsyncStorage.setItem("appLanguage", newLang);
        setLangState(newLang);
    };

    return (
        <LanguageContext.Provider value={{ lang, setLang, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
