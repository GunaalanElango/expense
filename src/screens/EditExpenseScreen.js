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
import RNPickerSelect from "react-native-picker-select";

import Input from "../components/Input";
import { formReducer, FORM_INPUT_CHANGE } from "../../store/reducers/form";
import { addExpense } from "../../store/actions/expense";

const EditExpenseScreen = (props) => {
  const dispatch = useDispatch();

  const isEditScreen = props.route.params.edit;
  const title = isEditScreen ? "Update Expense" : "Add Expense";

  const categories = useSelector((state) => state.category.expense);

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      amount: "",
      description: "",
    },
    inputValidity: {
      amount: false,
    },
    formIsValid: false,
  });
  const [category, setCategory] = useState("");

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
        category,
        formState.inputValues.description
      )
    );
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={Styles.screen}>
          <RNPickerSelect
            style={{
              inputAndroid: Styles.inputAndroid,
            }}
            items={categories.map((cat) => {
              return {
                label: cat.replace(/^\w/, (c) => c.toUpperCase()),
                value: cat,
              };
            })}
            useNativeAndroidPickerStyle={false}
            onValueChange={(value) => setCategory(value)}
            placeholder={{ label: "Select Category..", value: null }}
          />
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
    marginTop: 13,
  },
  submitButtonContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  inputAndroid: {
    fontSize: 14,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1.5,
    borderColor: "rgba(0,0,0,0.5)",
    borderRadius: 8,
    color: "black",
    paddingRight: 30,
  },
});

export default EditExpenseScreen;
