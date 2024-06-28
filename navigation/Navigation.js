import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddPlace from "../screens/AddPlace";
import AllPlaces from "../screens/AllPlaces";
import IconButton from "../components/ui/IconButton";
import { GlobalColors } from "../constants/colors";
import Map from "../screens/Map";

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: GlobalColors.primary500,
          },
          headerTintColor: GlobalColors.gray700,
          contentStyle: {
            backgroundColor: GlobalColors.gray700,
          },
        }}
      >
        <Stack.Screen
          name="AllPlaces"
          component={AllPlaces}
          options={({ navigation }) => ({
            title: "Your favourite places",
            headerRight: ({ tintColor }) => (
              <IconButton
                name="add"
                color={tintColor}
                size={24}
                onPress={() => {
                  navigation.navigate("AddPlace"); // go to the AddPlace screen onPress the + btn
                }}
              />
            ),
          })}
        />
        <Stack.Screen
          name="AddPlace"
          component={AddPlace}
          options={{
            title: "Add a new place",
          }}
        />
        <Stack.Screen name="Map" component={Map} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
