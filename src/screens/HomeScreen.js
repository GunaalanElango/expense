import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { IconButton, Colors, Portal } from "react-native-paper";
import { useIsDrawerOpen } from "@react-navigation/drawer";

import Fab from "../components/Fab";

const HomeScreen = (props) => {
  const isDrawerOpen = useIsDrawerOpen();
  let FAB = isDrawerOpen ? null : (
    <Portal>
      <Fab />
    </Portal>
  );

  return (
    <View style={Styles.screen}>
      <Text>HomeScreen</Text>
      {FAB}
    </View>
  );
};

const Styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomeScreen;
