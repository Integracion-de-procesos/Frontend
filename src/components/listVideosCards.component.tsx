import React from "react";
import { View, FlatList } from "react-native";
import VideoCard from "./videoCard.component";
import { VideoInterface } from "../types/video.interface";
import { homeScreenStyles as styles } from "../styles/home.styles";

import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigation";

import { crearReferencia } from "../services/reference.service";

interface ListVideosCardsProps {
  videos: VideoInterface[];
}
const ListVideosCards: React.FC<ListVideosCardsProps> = ({ videos }) => {

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.LVC_container}>

      <FlatList
        data={videos}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}

        renderItem={({ item }) => (
          <VideoCard
            {...item}
            onPress={async () => {
              try {
                /*
                console.log(`
                    idVideo: ${item.id}\n
                    Titulo: ${item.titulo}\n
                    Descripcion: ${item.descripcion}\n
                    Canal: ${item.canal}\n
                    Miniatura: ${item.miniatura}\n
                    Vistas: ${item.vistas}\n
                    Likes: ${item.likes}\n
                    Duracion: ${item.duracion}\n
                    Imagen de canal: ${item.canalImagen}\n
                    Fecha publicado: ${item.publicado}\n
                  `)
                */
               
                // Navegacion hacia el video
                navigation.navigate("SelectedVideo", {
                  id: item.id,
                  titulo: item.titulo,
                  descripcion: item.descripcion,
                  canal: item.canal,
                  miniatura: item.miniatura,
                  vistas: item.vistas,
                  likes: item.likes,
                  duracion: item.duracion,
                  canalImagen: item.canalImagen,
                  publicado: item.publicado,
                });
                await crearReferencia(item);
              } catch (error) {
                console.error("Error al crear referencia y navegar:", error);
              }
            }}
          />
        )}
      />

    </View>
  );
};

export default ListVideosCards;
