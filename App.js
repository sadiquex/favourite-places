import { StatusBar } from "expo-status-bar";
import Navigation from "./navigation/Navigation";
import { useEffect, useState } from "react";
import { init } from "./util/database";
import * as SplashScreen from "expo-splash-screen";

export default function App() {
  const [dbInitialized, setDbInitialized] = useState(false);

  // initialize the sql db
  // useEffect(() => {
  //   // Prevent the splash screen from auto hiding
  //   SplashScreen.preventAutoHideAsync();

  //   // Initialize the database
  //   init()
  //     .then(() => {
  //       setDbInitialized(true);
  //       // Hide the splash screen once the database is initialized
  //       SplashScreen.hideAsync();
  //     })
  //     .catch((err) => {
  // console.log(err);
  //     });
  // }, []);

  // if (!dbInitialized) {
  //   // Optionally, you can return null or a loading spinner here while the splash screen is shown
  //   return null;
  // }

  return (
    <>
      <StatusBar style="dark" />
      <Navigation />
    </>
  );
}
