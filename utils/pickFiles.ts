import * as DocumentPicker from "expo-document-picker";


export const pickFiles = async () => {
    const result = await DocumentPicker.getDocumentAsync({
        type: "*/*", // allow any file
        multiple: true
    });
    if (!result.canceled) {
        return result.assets
    }
}