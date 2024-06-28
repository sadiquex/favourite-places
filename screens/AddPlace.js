import { View, Text } from "react-native";
import PlaceForm from "../components/places/PlaceForm";

export default function AddPlace({ navigation }) {
  const createPlaceHandler = (newPlaceData) => {
    navigation.navigate("AllPlaces", { newPlaceData: newPlaceData });
  };

  return <PlaceForm onCreatePlace={createPlaceHandler} />;
}
