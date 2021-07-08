import React, { useEffect, useReducer, useCallback, useState } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "react-native-paper";

import Input from "../components/Input";
import { formReducer, FORM_INPUT_CHANGE } from "../../store/reducers/form";
import { addExpense } from "../../store/actions/expense";

const EditExpenseScreen = (props) => {
  const dispatch = useDispatch();

  const isEditScreen = props.route.params.edit;
  const title = isEditScreen ? "Update Expense" : "Add Expense";

  const categories = useSelector((state) => state.categories);
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      amount: "",
      description: "",
      category: "",
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

  const onSubmitHandler = () => {
    dispatch(
      addExpense(
        formState.inputValues.amount,
        formState.inputValues.category,
        formState.inputValues.description
      )
    );
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={Styles.screen}>
          <Input
            id="amount"
            label="Amount"
            keyboardType="numeric"
            errorText={{
              required: "Amount is required",
            }}
            initialValue={formState.inputValues.amount}
            initialValid={false}
            change={onValueChangeHandler}
            required
          />
          <Input
            id="description"
            label="Description"
            multiline={true}
            numberOfLines={3}
            initialValue={formState.inputValues.amount}
            initialValid={false}
            change={onValueChangeHandler}
          />
          <View style={Styles.submitButtonContainer}>
            <Button
              mode="contained"
              disabled={!formState.formIsValid}
              onPress={onSubmitHandler}
            >
              {title}
            </Button>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const Styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginHorizontal: "5%",
  },
  submitButtonContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
});

export default EditExpenseScreen;
