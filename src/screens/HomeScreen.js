import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { IconButton, Colors, Portal } from "react-native-paper";
import { useIsDrawerOpen } from "@react-navigation/drawer";
import { MaterialIcons, SimpleLineIcons } from "@expo/vector-icons";

import Fab from "../components/Fab";

const HomeScreen = (props) => {
  useEffect(() => {
    props.navigation.setOptions({
      headerLeft: () => (
        <IconButton
          icon={() => <SimpleLineIcons name="menu" size={25} color="#fff" />}
          color={Colors.white}
          size={25}
          onPress={() => props.navigation.toggleDrawer()}
        />
      ),
    });
  });

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
