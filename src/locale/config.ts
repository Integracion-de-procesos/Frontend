import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en.json";
import es from "./es.json";
import * as Localization from "expo-localization";

const systemLang =
    (Localization as any)?.locale?.startsWith("es") ? "es" : "en";

void i18n
    .use(initReactI18next)
    .init({
        lng: systemLang,
        fallbackLng: "es",
        resources: {
            en: { translation: en },
            es: { translation: es },
        },
        interpolation: { escapeValue: false },
    });

export default i18n;
