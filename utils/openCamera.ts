import * as ImagePicker from "expo-image-picker";

export const openCamera = async () => {
    const permission =
        await ImagePicker.requestCameraPermissionsAsync();

    if (!permission.granted) {
        alert("Camera permission required");
        return;
    }

    const result = await ImagePicker.launchCameraAsync({
        allowsEditing: false,
        quality: 1,
    });

    if (!result.canceled) {
        const file = result.assets[0];

        return file;
    }
};

export default openCamera;