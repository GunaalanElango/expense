import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StartupNavigator, MainNavigator } from "./Stack";
import { useSelector } from "react-redux";

const AppNavigator = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <NavigationContainer>
      {/* {isAuthenticated ? <MainNavigator /> : <StartupNavigator />} */}
      <MainNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;
