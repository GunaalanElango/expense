import React, { useState } from "react";
import { Text, StyleSheet, TouchableOpacity, View } from "react-native";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";

import Colors from "../../colors/colors";

const Fab = (props) => {
  let Items = props.items.map((item, index) => {
    return (
      <View style={Styles.fabItem} key={index}>
        <Text style={Styles.labelStyle}>{item.label}</Text>

        <TouchableOpacity
          style={{
            ...Styles.fabMainButton,
            backgroundColor: "white",
            padding: 10,
          }}
          onPress={item.clicked}
        >
          {item.icon}
        </TouchableOpacity>
      </View>
    );
  });

  return (
    <View style={Styles.fab}>
      {props.showItems ? Items : null}

      <TouchableOpacity
        activeOpacity={0.5}
        style={Styles.fabMainButton}
        onPress={props.clicked}
      >
        <MaterialIcons
          name={props.showItems ? "close" : "add"}
          size={25}
          color="#fff"
        />
      </TouchableOpacity>
    </View>
  );
};

const Styles = StyleSheet.create({
  labelStyle: {
    fontSize: 15,
    backgroundColor: "white",
    color: Colors.primary,
    marginRight: 5,
    padding: 5,
    borderRadius: 3,
  },
  fabMainButton: {
    padding: 20,
    marginTop: 10,
    backgroundColor: Colors.primary,
    borderRadius: 50,
  },
  fabItem: { flexDirection: "row", alignItems: "center", marginRight: 10 },
  fab: {
    flex: 1,
    position: "absolute",
    right: 0,
    bottom: 0,
    margin: 16,
    alignItems: "flex-end",
    zIndex: 1,
  },
});

export default Fab;
