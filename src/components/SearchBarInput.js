import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput, FlatList } from "react-native";
import { useSelector } from "react-redux";

import { Styles as InputStyles } from "./Input";

const SearchBarInput = (props) => {
  const categories = useSelector((state) => state.category.categories);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const onFocusHandler = () => {
    setIsDropDownOpen(true);
  };

  const onBlurHandler = () => {
    setIsDropDownOpen(false);
  };

  let Dropdown = isDropDownOpen ? (
    <View style={Styles.dropdown}>
      <View style={Styles.listContainer}>
        <FlatList
          data={categories}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {
            return (
              <View>
                <Text>{item.name}</Text>
              </View>
            );
          }}
        />
      </View>
    </View>
  ) : null;

  return (
    <View style={InputStyles.inputContainer}>
      <Text style={InputStyles.label}>{props.label}</Text>
      <TextInput
        style={InputStyles.input}
        onFocus={onFocusHandler}
        onBlur={onBlurHandler}
      />
      {Dropdown}
    </View>
  );
};

const Styles = StyleSheet.create({
  dropdown: {
    position: "absolute",
    top: 76,
    zIndex: 1,
    height: 200,
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 8,
  },
});

export default SearchBarInput;
