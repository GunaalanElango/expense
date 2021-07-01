import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainNavigator from "./MainNavigation";
import StartupScreen from "../src/screens/StartupScreen";
import { useSelector } from "react-redux";

const AppNavigator = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <NavigationContainer>
      {isAuthenticated ? <MainNavigator /> : <StartupScreen />}
    </NavigationContainer>
  );
};

export default AppNavigator;
