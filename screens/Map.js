import { useCallback, useLayoutEffect, useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import IconButton from "../components/ui/IconButton";

// component to allow you select your location manually
export default function Map({ navigation }) {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const location = {
    latitude: 7.9465,
    longitude: 1.0232,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  // handle the location we have clicked on
  const selectLocationHandler = (event) => {
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;

    // pass lat and lng to state
    setSelectedLocation({ lat: lat, lng: lng });
  };

  // save the location we've picked, pass it to 'AddPlace'
  // useCallback to memoize/'cache' the value so it does not get recalculated
  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert(
        "No location picked",
        "Tap on the map to pick add a location"
      );
      return;
    }
    navigation.navigate("AddPlace", {
      pickedLocation: selectedLocation,
    });
  }, [navigation, selectedLocation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          name={"save"}
          size={24}
          color={tintColor}
          onPress={savePickedLocationHandler}
        />
      ),
    });
  }, [navigation, savePickedLocationHandler]);

  return (
    <MapView
      style={styles.mapStyle}
      initialRegion={location}
      onPress={selectLocationHandler}
    >
      {selectedLocation && (
        <Marker
          title="Picked location"
          coordinate={{
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng,
          }}
        />
      )}
    </MapView>
  );
}

const styles = StyleSheet.create({
  mapStyle: {
    flex: 1,
  },
});
