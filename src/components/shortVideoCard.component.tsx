import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { VideoInterface } from "../types/video.interface";
import { recordScreenStyles as styles } from "../styles/record.styles";
import { useTheme } from "../contexts/theme.context";

const ShortVideoCard: React.FC<VideoInterface> = ({
  id,
  titulo,
  descripcion,
  canal,
  miniatura,
  vistas,
  likes,
  duracion,
  canalImagen,
  publicado,
  onPress,
}) => {

  const { theme } = useTheme()
  return (
    <TouchableOpacity onPress={onPress} style={styles.SVC_generalContainer}>

      <View style={styles.SVC_container}>

        <Image
          source={{ uri: miniatura }}
          style={styles.SVC_videoContainer}
          resizeMode="cover"
        />

        {/* informacion del video */}
        <View style={styles.SVC_textContainer}>

          <Text style={[styles.SVC_titleText, { color: theme.text }]} numberOfLines={2}>
            {titulo}
          </Text>
          <Text style={[styles.SVC_metaText, { color: theme.subtitle }]} numberOfLines={2}>
            {canal}
          </Text>
          <Text style={[styles.SVC_metaText, { color: theme.subtitle }]} numberOfLines={2}>
            {vistas}
          </Text>
          <Text style={[styles.SVC_metaText, { color: theme.subtitle }]} numberOfLines={2}>
            {publicado}
          </Text>

        </View>
      </View>
    </TouchableOpacity>

  );
};

export default ShortVideoCard;
