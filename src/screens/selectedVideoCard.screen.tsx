import React, { useState } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import { useRoute, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../types/navigation";
import { selectedVideoStyle as styles } from "../styles/selectedVideo.style";
import { useTheme } from "../contexts/theme.context";

type SelectedVideoRouteProp = RouteProp<RootStackParamList, "SelectedVideo">;

const SelectedVideoCard: React.FC = () => {
    const route = useRoute<SelectedVideoRouteProp>();
    const {
        id,
        titulo,
        descripcion,
        canal,
        canalImagen,
        vistas,
        likes,
        publicado,
    } = route.params;

    const { theme } = useTheme();
    const [playing, setPlaying] = useState(false);
    type PlayerState = "playing" | "paused" | "ended" | "buffering" | "unstarted";

    return (
        <View style={{ flex: 1, backgroundColor: theme.background }}>

            <View style={styles.container}>
                {/* Reproductor de youtube */}
                <View style={styles.videoContainer}>
                    <YoutubePlayer
                        height={300}
                        play={playing}
                        videoId={id}
                        onChangeState={(state: PlayerState) => setPlaying(state === "playing")}
                    />
                </View>

                <View style={styles.metaSection}>
                    <Text style={[styles.titleText, { color: theme.text }]}>{titulo}</Text>
                    <View style={styles.metaRow}>
                        {[
                            { label: "Vistas", value: vistas },
                            { label: "Publicado", value: publicado },
                            { label: "Me gusta", value: likes },
                        ].map((item, index) => (
                            <View key={index} style={styles.metaItem}>
                                <Text style={[styles.metaLabel, { color: theme.subtitle }]}>
                                    {item.label}
                                </Text>
                                <Text style={[styles.metaValue, { color: theme.text }]}>
                                    {item.value}
                                </Text>
                            </View>
                        ))}
                    </View>
                </View>

                <View style={[styles.descriptionContainer, { height: descripcion ? "20%" : 0 }]}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                    >
                        <Text style={[styles.descriptionText, { color: theme.subtitle }]}>
                            {descripcion || "Sin descripcion disponible."}
                        </Text>
                    </ScrollView>
                </View>

                <View style={styles.channelSection}>
                    <Image source={{ uri: canalImagen }} style={styles.channelImage} />
                    <Text style={[styles.channelName, { color: theme.text }]}>{canal}</Text>
                </View>
            </View>
        </View >
    );
};

export default SelectedVideoCard;
