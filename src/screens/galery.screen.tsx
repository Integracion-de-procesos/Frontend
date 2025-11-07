import React, { useState } from "react";
import { View, Text, Button, Image, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigation";
import { subirImagen } from "../services/image.service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useProfile } from "../contexts/profile.context";
import { useLanguage } from "../contexts/languaje.context";

export default function GaleriaScreen() {
    const [image, setImage] = useState<string | null>(null);
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const { toggleChanged } = useProfile()
    const { t } = useLanguage()

    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            Alert.alert(t("galery_permission1"), t("galery_permission2"));
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: "images",
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled && result.assets?.length > 0) {
            setImage(result.assets[0].uri);
        }
    };

    const handleGuardar = async () => {
        try {
            if (!image) {
                Alert.alert(t("galery_selectError1"), t("galery_selectError2"));
                return;
            }

            const resSubir = await subirImagen(image);
            if (!resSubir.success) {
                Alert.alert(t("galery_error"), resSubir.message);
                return;
            }
            await AsyncStorage.setItem("profile", resSubir.nombreArchivo ?? "profile.png")
            toggleChanged()
            Alert.alert(t("galery_success1"), t("galery_success2"));
            navigation.goBack();
        } catch (err) {
            Alert.alert(t("galery_error1"), t("galery_error2"));
        }
    };

    return (
        <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
            <Button title={t("galery_select")} onPress={pickImage} />

            {image && (
                <>
                    <Text style={{ marginTop: 10 }}>{t("galery_imgSelected")}:</Text>
                    <Image
                        source={{ uri: image }}
                        style={{
                            width: 200,
                            height: 200,
                            marginTop: 10,
                            borderRadius: 8,
                        }}
                    />

                    <View style={{ marginTop: 20, width: 200 }}>
                        <Button title={t("galery_save")} onPress={handleGuardar} />
                    </View>
                </>
            )}
        </View>
    );
}
