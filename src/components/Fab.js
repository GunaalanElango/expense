import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import Colors from "../../colors/colors";

const Fab = (props) => {
  return (
    <View style={Styles.fab}>
      <TouchableOpacity
        activeOpacity={0.5}
        style={Styles.fabMainButton}
        onPress={props.clicked}
      >
        <MaterialIcons name="add" size={25} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const Styles = StyleSheet.create({
  fabMainButton: {
    padding: 20,
    marginTop: 10,
    backgroundColor: Colors.primary,
    borderRadius: 50,
    elevation: 10,
  },
  fab: {
    position: "absolute",
    right: 0,
    bottom: 0,
    padding: 16,
  },
});

export default Fab;
