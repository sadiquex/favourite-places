import { View, Text, Pressable, StyleSheet } from "react-native";
import { GlobalColors } from "../../constants/colors";

export default function Button({ onPress, children }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
    >
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: { marginVertical: 8 },
  pressed: { opacity: 0.7 },
  text: {
    textAlign: "center",
    fontSize: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    margin: 4,
    backgroundColor: GlobalColors.primary800,
    color: GlobalColors.primary50,
    elevation: 2,
    shadowColor: "black",
    shadowOpacity: 0.15,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowRadius: 2,
    borderRadius: 4,
  },
});
