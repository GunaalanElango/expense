import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

const RadioButton = (props) => {
  const [selectedValue, setSelectedValue] = useState(
    props.initialSelected || "expense"
  );

  const onChangeHandler = (type) => {
    props.onchange(type);
    setSelectedValue(type);
  };

  return (
    <View style={Styles.container}>
      <TouchableOpacity
        activeOpacity={0.7}
        style={Styles.button}
        onPress={() => onChangeHandler("income")}
      >
        <Text
          style={
            selectedValue == "income"
              ? Styles.selectedButtonLabel
              : Styles.buttonLabel
          }
        >
          Income
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.7}
        style={Styles.button}
        onPress={() => onChangeHandler("expense")}
      >
        <Text
          style={
            selectedValue == "expense"
              ? Styles.selectedButtonLabel
              : Styles.buttonLabel
          }
        >
          Expense
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  button: {
    margin: 5,
  },
  buttonLabel: {
    fontSize: 15,
    fontWeight: "bold",
    color: "salmon",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
    borderColor: "salmon",
    borderWidth: 2,
    textAlignVertical: "center",
  },
  selectedButtonLabel: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
    borderColor: "salmon",
    borderWidth: 2,
    textAlignVertical: "center",
    backgroundColor: "salmon",
  },
});

export default RadioButton;
