import { View, Text, StyleSheet, Alert } from "react-native";
import OutlinedButton from "../ui/OutlinedButton";
import { GlobalColors } from "../../constants/colors";
import { useEffect, useState } from "react";
import * as Location from "expo-location";
import MapView from "react-native-maps";
import {
  useNavigation,
  useRoute,
  useIsFocused,
} from "@react-navigation/native";

export default function LocationPicker({ onPickLocation }) {
  const [location, setLocation] = useState(null);
  const [locationName, setLocationName] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);

  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    if (isFocused && route.params) {
      const pickedLocation = route.params.pickedLocation;
      if (pickedLocation) {
        // get the location clicked from the map
        const mapPickedLocation = {
          longitude: pickedLocation.lng, // from our params
          latitude: pickedLocation.lat,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        };
        setLocation(mapPickedLocation);
      }
    }
  }, [route, isFocused]);

  // pass the location to the PlaceForm
  useEffect(() => {
    if (location) {
      getLocationName(location); // pass the lng and lat to get locationName
      onPickLocation({ ...location, locationName: locationName }); // pass the locationName to our form
    }
  }, [location, locationName, onPickLocation]);

  // reverse geocode to get location name
  const getLocationName = async (location) => {
    try {
      const [reverseGeocode] = await Location.reverseGeocodeAsync({
        latitude: location.latitude,
        longitude: location.longitude,
      });

      if (reverseGeocode) {
        const name = `${reverseGeocode.city}, ${reverseGeocode.region}`;
        setLocationName(name);
      } else {
        setLocationName("Unknown Location");
      }
    } catch (error) {
      console.error("Reverse geocoding failed", error);
      setLocationName("Unknown Location");
    }
  };

  // permission to access location
  const getLocationHandler = async () => {
    // request for permission
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    try {
      let location = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    } catch (error) {
      Alert.alert("Error", "Could not fetch location. Please try again later.");
      console.error(error);
    }
  };

  // go to Map
  const pickOnMapHandler = () => {
    navigation.navigate("Map");
  };

  return (
    <View>
      {/* holds the map preview */}
      <View style={styles.mapPreview}>
        {location ? (
          <MapView style={styles.map} initialRegion={location} />
        ) : (
          <View style={styles.fallbackText}>
            <Text>No location chosen yet!</Text>
          </View>
        )}
      </View>
      <View style={styles.actionsContainer}>
        <OutlinedButton iconName={"location"} onPress={getLocationHandler}>
          Locate User
        </OutlinedButton>
        <OutlinedButton iconName={"map"} onPress={pickOnMapHandler}>
          Pick On Map
        </OutlinedButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mapPreview: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 200,
    backgroundColor: GlobalColors.primary500,
    marginVertical: 8,
  },
  map: {
    height: "100%",
    width: "100%",
  },
  fallbackText: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});
