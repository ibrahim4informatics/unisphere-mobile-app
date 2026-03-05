import * as ImagePicker from "expo-image-picker";

const pickImage = async () => {
  const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (!permission.granted) {
    alert("Permission required!");
    return;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: "images",
    allowsMultipleSelection:false,
    quality: 1,
  });

  if (!result.canceled) {
    const file = result.assets[0];
    return file;
  }
};

export default pickImage;