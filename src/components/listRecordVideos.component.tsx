import React from "react";
import { FlatList, Text, View } from "react-native";
import ShortVideoCard from "./shortVideoCard.component";

import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigation";
import { ReferenciaInterface } from "../types/referencia.interface";

import { recordScreenStyles as styles } from "../styles/record.styles";
import { useTheme } from "../contexts/theme.context";

interface ListRecordVideosProps {
    videos: ReferenciaInterface[];
}

const ListRecordVideos: React.FC<ListRecordVideosProps> = ({ videos }) => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const { theme } = useTheme();

    return (
        <View style={[styles.LRV_container, { borderColor: theme.subtitle }]}>
            <FlatList
                data={videos.slice().reverse()} // renderizado tipo pila
                keyExtractor={(item) => item.idReferencia.toString()}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => {
                    const videoProps = {
                        id: item.idVideo,
                        titulo: item.titulo,
                        descripcion: item.descripcion,
                        canal: item.canal,
                        miniatura: item.miniatura,
                        vistas: item.vistas,
                        likes: item.likes,
                        canalImagen: item.canalImagen || "https://placehold.co/100x100",
                        publicado: item.publicado || "Reciente",
                        onPress: () =>
                            navigation.navigate("SelectedVideo", {
                                id: item.idVideo,
                                titulo: item.titulo,
                                descripcion: item.descripcion,
                                canal: item.canal,
                                canalImagen: item.canalImagen,
                                vistas: item.vistas,
                                likes: item.likes,
                                publicado: item.publicado,
                            }),
                    };

                    return <ShortVideoCard {...videoProps} />;
                }}
            />
        </View>
    );
};

export default ListRecordVideos;
