import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

import Colors from "../../colors/colors";

const CategoryList = (props) => {
  return (
    <View style={Styles.container}>
      {props.categoryList.map((category, index) => {
        return (
          <TouchableOpacity style={Styles.listItem} key={index}>
            <Text style={{ color: "#ffffff", fontSize: 18 }}>
              {category.replace(/^\w/, (c) => c.toUpperCase())}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  listItem: {
    marginHorizontal: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 15,
    backgroundColor: Colors.primary,
  },
});

export default CategoryList;
