import { View, Text, Image, StyleSheet } from "react-native";
import { useState } from "react";
import OutlinedButton from "../ui/OutlinedButton";
import { GlobalColors } from "../../constants/colors";
import * as ImagePicker from "expo-image-picker";

export function PickImage({ onTakeImage }) {
  const [image, setImage] = useState(null);

  //   async function to allow user take image
  const takeImageHandler = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      //   mediaTypes: ImagePicker.MediaTypeOptions.All,
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true, // allow user to edit photo before confirming
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      onTakeImage(result.assets[0].uri);
    }
  };

  return (
    <View>
      <View style={styles.container}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <Text style={styles.fallback}>No image selected</Text>
        )}
      </View>

      <OutlinedButton onPress={takeImageHandler} iconName={"camera"}>
        Take Image
      </OutlinedButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 200,
    backgroundColor: GlobalColors.primary500,
    marginVertical: 8,
  },
  image: {
    width: "100%",
    height: 200,
    marginVertical: 8,
  },
  fallback: {},
});
