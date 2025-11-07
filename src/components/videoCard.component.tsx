import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { VideoInterface } from "../types/video.interface";
import { videoStyles } from "../styles/video.style";
import { useTheme } from "../contexts/theme.context";

const VideoCard: React.FC<VideoInterface> = ({
    titulo,
    canal,
    miniatura,
    vistas,
    canalImagen,
    publicado,
    onPress,
}) => {
    const { theme } = useTheme();

    return (
        <TouchableOpacity
            onPress={onPress}
            style={[videoStyles.container, { backgroundColor: theme.background }]}
            activeOpacity={0.8}
        >
            {/* Miniatura del video */}
            <Image source={{ uri: miniatura }} style={videoStyles.miniatura} />

            {/* Información del video */}
            <View style={videoStyles.infoContainer}>
                <Image
                    source={{ uri: canalImagen }}
                    style={[videoStyles.canalImagen, { backgroundColor: theme.text }]}
                />
                <View style={videoStyles.textContainer}>
                    <Text
                        numberOfLines={2}
                        style={[videoStyles.titulo, { color: theme.text }]}
                    >
                        {titulo}
                    </Text>
                    <Text
                        numberOfLines={1}
                        style={[videoStyles.metadatos, { color: theme.subtitle }]}
                    >
                        {canal} • {vistas} vistas • {publicado}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default VideoCard;
