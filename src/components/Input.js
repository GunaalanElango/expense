import React, { useReducer } from "react";
import { Text, TextInput, View, StyleSheet } from "react-native";

let MobileNumberRegex = /^\d{10}$/;
let NameRegex = /^[a-zA-Z ]+$/;

const inputReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_VALUE_CHANGE":
      return {
        ...state,
        value: action.value,
      };

    default:
      return state;
  }
};

const Input = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: "",
  });

  const onValueChangeHandler = (value) => {
    dispatch({
      type: "INPUT_VALUE_CHANGE",
      value,
    });
    props.change(props.id, value);
  };

  return (
    <View style={Styles.inputContainer}>
      <Text style={Styles.label}>{props.label}</Text>
      <TextInput
        style={Styles.input}
        keyboardType={props.keyboardType}
        value={inputState.value}
        onChangeText={onValueChangeHandler}
        {...props}
      />
    </View>
  );
};

const Styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    marginVertical: 5,
  },
  label: {
    fontWeight: "bold",
    fontSize: 15,
    paddingBottom: 5,
  },
  input: {
    borderColor: "#000",
    borderRadius: 10,
    borderWidth: 1.5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 18,
  },
});

export default Input;
