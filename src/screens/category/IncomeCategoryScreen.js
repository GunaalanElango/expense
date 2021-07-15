import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { useSelector } from "react-redux";

import CategoryList from "../../components/CategoryList";

const IncomeCategoryScreen = (props) => {
  const categories = useSelector((state) => state.category);

  return (
    <View style={Styles.screen}>
      <CategoryList categoryList={categories} />
    </View>
  );
};

const Styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: "5%",
  },
});

export default IncomeCategoryScreen;
