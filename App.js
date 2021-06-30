import React from "react";
import { StyleSheet, StatusBar } from "react-native";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";

import Colors from "./colors/colors";
import AppNavigator from "./navigation/AppNavigation";

const Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.primary,
    accent: Colors.secondary,
  },
};

export default function App() {
  return (
    <PaperProvider theme={Theme}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />
      <AppNavigator />
    </PaperProvider>
  );
}

const Styles = StyleSheet.create({});
