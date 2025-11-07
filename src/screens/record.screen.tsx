import React, { useCallback, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import ListRecordVideos from "../components/listRecordVideos.component";
import GeneralHeader from "../components/generalHeader.component";
import { recordScreenStyles as styles } from "../styles/record.styles";
import { useTheme } from "../contexts/theme.context";
import { ReferenciaInterface } from "../types/referencia.interface";
import { getReferenciasPorHistorial } from "../services/reference.service";
import { useLanguage } from "../contexts/languaje.context";

const RecordScreen: React.FC = () => {
    const { theme } = useTheme();
    const [videos, setVideos] = useState<ReferenciaInterface[]>([]);
    const [loading, setLoading] = useState(true);
    const { t } = useLanguage()

    const cargarReferencias = async () => {
        try {
            setLoading(true);

            const res = await getReferenciasPorHistorial();

            if (res.success && Array.isArray(res.data)) {
                setVideos(res.data);
            } else
                setVideos([])

        } catch (err: any) {
            console.error("Error cargando historial:", err?.message || err);
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            cargarReferencias();
        }, [])
    );
    if (loading) {
        return (
            <View
                style={[
                    styles.RS_generalContainer,
                    {
                        backgroundColor: theme.background,
                        justifyContent: "center",
                        alignItems: "center",
                    },
                ]}
            >
                <ActivityIndicator size="large" color={theme.primary} />
                <Text style={{ color: theme.text, marginTop: 10 }}>
                    {t("record_mssgLoad")}
                </Text>
            </View>
        );
    }

    return (
        <View style={[styles.RS_generalContainer, { backgroundColor: theme.background }]}>
            <View style={styles.RS_container}>
                <GeneralHeader
                    screen={t("record_headerTitle")}
                />
                {videos.length > 0 ? (
                    <ListRecordVideos videos={videos} />
                ) : (
                    <Text style={{
                        color: theme.subtitle,
                        textAlign: "center",
                        marginTop: 20,
                    }}>
                        {t("record_mssgError")}
                    </Text>
                )}
            </View>
        </View>
    );
};

export default RecordScreen;
