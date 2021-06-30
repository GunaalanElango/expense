import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { IconButton, Colors, Portal } from "react-native-paper";

import Fab from "../components/Fab";

const HomeScreen = (props) => {
  useEffect(() => {
    props.navigation.setOptions({
      headerLeft: () => (
        <IconButton
          icon="menu"
          color={Colors.white}
          size={25}
          onPress={() => {}}
        />
      ),
    });
  });

  return (
    <View style={Styles.screen}>
      <Text>HomeScreen</Text>
      <Portal>
        <Fab />
      </Portal>
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
