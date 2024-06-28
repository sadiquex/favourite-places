import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GlobalColors } from "../../constants/colors";

export default function OutlinedButton({ onPress, iconName, children }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
    >
      <Ionicons
        style={styles.icon}
        name={iconName}
        size={18}
        color={GlobalColors.primary500}
      />
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 2,
    borderWidth: 1,
    borderColor: GlobalColors.primary500,
  },
  pressed: {
    opacity: 0.7,
  },
  icon: {},
  text: {
    color: GlobalColors.primary500,
    fontSize: 16,
  },
});
