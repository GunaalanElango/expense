import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainNavigator, { StartupNavigator } from "./MainNavigation";
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
