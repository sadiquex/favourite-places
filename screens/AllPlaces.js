import { useEffect, useState } from "react";
import PlacesList from "../components/places/PlacesList";
import { useIsFocused } from "@react-navigation/native";

export default function AllPlaces({ route }) {
  const { params } = route;

  const [loadedPlaces, setLoadedPlaces] = useState([]);

  const isFocused = useIsFocused();

  // on the first render of AllPlaces, we won't have `params` (because of the stack), so we have to setIsFocused to get them
  useEffect(() => {
    if (isFocused && params) {
      // add the new place to the loadedPlaces array
      setLoadedPlaces((currentPlaces) => [
        ...currentPlaces,
        params.newPlaceData,
      ]);
    }
  }, [isFocused, params]);

  return <PlacesList places={loadedPlaces} />;
}
