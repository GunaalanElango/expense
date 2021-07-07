import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";

import { Styles as InputStyles } from "./Input";

const SearchBarInput = (props) => {
  const [categories, setCategories] = useState(props.categories);
  const [category, setCategory] = useState(props.initialValue);

  const onValueChangeHandler = (value) => {
    const filteredCategory = props.categories.filter((cat) => {
      return cat.name.includes(value);
    });
    setCategories(filteredCategory);
    setCategory(value);
  };

  const { id, change } = props;

  useEffect(() => {
    change(id, category);
  }, [category, change]);

  let Dropdown = props.showDropDown ? (
    <View style={Styles.dropdown}>
      <View style={Styles.listContainer}>
        <FlatList
          data={categories}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={Styles.listItem}
                onPress={() => {
                  setCategory(item.name);
                  props.ondismiss();
                }}
              >
                <Text>{item.name}</Text>
              </TouchableOpacity>
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
        value={category}
        onChangeText={onValueChangeHandler}
        onFocus={props.onfocus}
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
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  listItem: {
    marginVertical: 3,
    backgroundColor: "rgba(0,0,0,0.05)",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});

export default SearchBarInput;
