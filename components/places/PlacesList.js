import { FlatList, StyleSheet, Text, View } from "react-native";
import PlaceItem from "./PlaceItem";
import { GlobalColors } from "../../constants/colors";

export default function PlacesList({ places }) {
  //   if there are no places, return this fallback
  return !places || places.length === 0 ? (
    <View style={styles.fallbackContainer}>
      <Text style={styles.fallbackText}>
        No places added yet - start adding some
      </Text>
    </View>
  ) : (
    <FlatList
      data={places}
      renderItem={({ item }) => <PlaceItem place={item} />}
      keyExtractor={(item) => item.id}
    />
  );
}

const styles = StyleSheet.create({
  fallbackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    fontSize: 16,
    color: GlobalColors.primary200,
  },
});
