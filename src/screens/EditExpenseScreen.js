import React, { useEffect, useReducer, useCallback } from "react";
import { View, StyleSheet, Text } from "react-native";

import Input from "../components/Input";
import { formReducer, FORM_INPUT_CHANGE } from "../../store/reducers/form";

const EditExpenseScreen = (props) => {
  const isEditScreen = props.route.params.edit;
  const title = isEditScreen ? "Update Expense" : "Add Expense";

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      amount: "",
    },
    inputValidity: {
      amount: false,
    },
    formIsValid: false,
  });

  const onValueChangeHandler = useCallback(
    (id, value, isValid) => {
      dispatchFormState({
        type: FORM_INPUT_CHANGE,
        id,
        value,
        isValid,
      });
    },
    [dispatchFormState]
  );

  useEffect(() => {
    props.navigation.setOptions({
      title: title,
    });
  });

  return (
    <View style={Styles.screen}>
      <Text style={Styles.formTitle}>{title}</Text>
      <Input
        id="amount"
        label="Amount"
        keyboardType="numeric"
        errorText={{
          required: "Amount is required",
        }}
        initialValue={formState.inputValues.amount}
        initialValid={true}
        change={onValueChangeHandler}
        required
      />
    </View>
  );
};

const Styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: "5%",
  },
  formTitle: {
    textAlign: "center",
    paddingTop: 20,
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default EditExpenseScreen;
