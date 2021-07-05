import React, { useReducer, useEffect } from "react";
import { Text, TextInput, View, StyleSheet } from "react-native";

const INPUT_VALUE_CHANGE = "INPUT_VALUE_CHANGE";
const INPUT_BLUR = "INPUT_BLUR";

const inputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_VALUE_CHANGE:
      return {
        ...state,
        value: action.value,
        isValid: action.isValid,
      };

    case INPUT_BLUR:
      return {
        ...state,
        toched: true,
      };

    default:
      return state;
  }
};

const Input = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue ? props.initialValue : "",
    touched: false,
    isValid: props.initialValid,
  });

  const onValueChangeHandler = (value) => {
    let isValid = true;
    if (props.required && value.length <= 0) {
      isValid = false;
    }
    dispatch({ type: INPUT_VALUE_CHANGE, value, isValid });
  };

  const { id, change } = props;

  useEffect(() => {
    change(id, inputState.value, inputState.isValid);
  }, [inputState, change]);

  const onBlurHandler = () => {
    dispatch({ type: INPUT_BLUR });
  };

  return (
    <View style={Styles.inputContainer}>
      <Text style={Styles.label}>{props.label}</Text>
      <TextInput
        style={Styles.input}
        value={inputState.value}
        onChangeText={onValueChangeHandler}
        onBlur={onBlurHandler}
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
