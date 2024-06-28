import { useCallback, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  Alert,
} from "react-native";
import { GlobalColors } from "../../constants/colors";
import { PickImage as ImagePicker } from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import * as Location from "expo-location";
import Button from "../ui/Button";
import { Place } from "../../models/place";

// 1. add a title for every place
// 2. allow user to take a photo and show the preview

export default function PlaceForm({ onCreatePlace }) {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [pickedLocation, setPickedLocation] = useState(null);

  const changeTitleHandler = (enteredText) => {
    setEnteredTitle(enteredText);
  };

  const takeImageHandler = (imageUri) => {
    setSelectedImage(imageUri);
  };

  const pickLocationHandler = useCallback((location) => {
    setPickedLocation(location);
  }, []);

  const savePlaceHandler = () => {
    // require all inputs
    if (!enteredTitle || !selectedImage || !pickedLocation) {
      Alert.alert(
        "Incomplete Input",
        "Please provide a title, image, and location for the place."
      );
      return;
    }

    // pass our values to the Place class to create one
    const newPlaceData = new Place(
      enteredTitle,
      selectedImage,
      pickedLocation.locationName, // address (in Place class)
      pickedLocation
    );
    // pass data to AddPlace screen
    onCreatePlace(newPlaceData);
  };

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          onChangeText={changeTitleHandler}
          value={enteredTitle}
        />
      </View>
      <ImagePicker onTakeImage={takeImageHandler} />
      <LocationPicker onPickLocation={pickLocationHandler} />
      <Button onPress={savePlaceHandler}>Add Place</Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    color: GlobalColors.primary500,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: GlobalColors.primary700,
    borderBottomWidth: 2,
    backgroundColor: GlobalColors.primary100,
  },
});
