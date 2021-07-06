import React, { useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";

import Input from "../components/Input";

const EditExpenseScreen = (props) => {
  const isEditScreen = props.route.params.edit;
  const title = isEditScreen ? "Update Expense" : "Add Expense";

  useEffect(() => {
    props.navigation.setOptions({
      title: title,
    });
  });

  return (
    <View style={Styles.screen}>
      <Text style={{ textAlign: "center" }}>{title}</Text>
    </View>
  );
};

const Styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default EditExpenseScreen;
