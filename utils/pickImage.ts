import * as ImagePicker from "expo-image-picker";

const pickImage = async (multiple?: boolean) => {
  const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (!permission.granted) {
    alert("Permission required!");
    return;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: "images",
    allowsMultipleSelection: multiple || false,
    quality: 1,
  });

  if (!result.canceled) {
    const files = result.assets;
    if (multiple) {

      return files;
    }

    return files[0];
  }
};

export default pickImage;