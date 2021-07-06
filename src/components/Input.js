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
        errorText: action.error,
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
    errorText: "",
  });

  const onValueChangeHandler = (value) => {
    let mobileNumberRegex = /^[6789]\d{9}$/;
    let nameRegex = /^[a-zA-Z ]+$/;
    let isValid = true;
    let error = "";

    if (props.required && value.trim().length <= 0) {
      isValid = false;
      error = props.errorText.required;
    }

    if (props.mobileNumber && !mobileNumberRegex.test(value)) {
      isValid = false;
      error = props.errorText.mobileNumberInvalid;
    }

    if (props.name && !nameRegex.test(value)) {
      isValid = false;
      error = props.errorText.nameInvalid;
    }

    dispatch({ type: INPUT_VALUE_CHANGE, value, isValid, error });
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
      <View style={{ flexDirection: "row" }}>
        <Text style={Styles.label}>{props.label}</Text>
        {props.required ? (
          <Text style={{ color: "red", paddingHorizontal: 5 }}>*</Text>
        ) : null}
      </View>
      <TextInput
        style={Styles.input}
        value={inputState.value}
        onChangeText={onValueChangeHandler}
        onBlur={onBlurHandler}
        {...props}
      />
      {!inputState.isValid &&
      inputState.toched &&
      inputState.errorText !== "" ? (
        <Text style={Styles.errorText}>{inputState.errorText}</Text>
      ) : null}
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
    fontSize: 16,
    paddingBottom: 5,
    color: "rgba(0,0,0,0.7)",
  },
  input: {
    borderColor: "rgba(0,0,0,0.5)",
    borderRadius: 10,
    borderWidth: 1.5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 18,
  },
  errorText: {
    color: "red",
    fontSize: 13,
    paddingTop: 5,
  },
});

export default Input;
