import React, { useEffect, useReducer, useCallback } from "react";
import { View, StyleSheet, Text, KeyboardAvoidingView } from "react-native";

import Input from "../components/Input";
import SearchBarInput from "../components/SearchBarInput";
import { formReducer, FORM_INPUT_CHANGE } from "../../store/reducers/form";

const EditExpenseScreen = (props) => {
  const isEditScreen = props.route.params.edit;
  const title = isEditScreen ? "Update Expense" : "Add Expense";

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      amount: "",
      description: "",
    },
    inputValidity: {
      amount: false,
      description: "",
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
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <View style={Styles.screen}>
        <Text style={Styles.formTitle}>{title}</Text>
        <SearchBarInput label="Category" />
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
        <Input
          id="description"
          label="Description"
          multiline={true}
          numberOfLines={3}
          initialValue={formState.inputValues.amount}
          initialValid={true}
          change={onValueChangeHandler}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const Styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginHorizontal: "5%",
  },
  formTitle: {
    textAlign: "center",
    paddingTop: 20,
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default EditExpenseScreen;
