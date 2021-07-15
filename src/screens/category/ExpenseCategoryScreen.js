import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { useSelector } from "react-redux";

import CategoryList from "../../components/CategoryList";

const ExpenseCategoryScreen = (props) => {
  const category = useSelector((state) => state.category);

  return (
    <View style={Styles.screen}>
      <CategoryList categoryList={category} />
    </View>
  );
};

const Styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: "5%",
  },
});

export default ExpenseCategoryScreen;
