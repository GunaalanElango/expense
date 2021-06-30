import React from "react";
import { TextInput, Text } from "react-native-paper";
import { StyleSheet, View } from "react-native";

const AddIncomeScreen = (props) => {
  return (
    <View style={Styles.screen}>
      <Text>Add Income Screen</Text>
    </View>
  );
};

const Styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AddIncomeScreen;
