import React, { useEffect, useReducer, useCallback, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useSelector } from "react-redux";

import Input from "../components/Input";
import SearchBarInput from "../components/SearchBarInput";
import { formReducer, FORM_INPUT_CHANGE } from "../../store/reducers/form";

const EditExpenseScreen = (props) => {
  const isEditScreen = props.route.params.edit;
  const title = isEditScreen ? "Update Expense" : "Add Expense";

  const categories = useSelector((state) => state.category.categories);
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      amount: "",
      description: "",
      category: "",
    },
    inputValidity: {
      amount: false,
      description: "",
    },
    formIsValid: false,
  });

  const [showDropDown, setShowDropDown] = useState(false);

  const onFocusSearch = () => {
    setShowDropDown(true);
  };

  const onDismissDropdown = () => {
    setShowDropDown(false);
  };

  const onValueChangeHandler = useCallback(
    (id, value, isValid = false) => {
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
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
          onDismissDropdown();
        }}
      >
        <View style={Styles.screen}>
          <Text style={Styles.formTitle}>{title}</Text>
          <SearchBarInput
            categories={categories}
            label="Category"
            initialValue={formState.inputValues.category}
            id="category"
            change={onValueChangeHandler}
            showDropDown={showDropDown}
            onfocus={onFocusSearch}
            ondismiss={onDismissDropdown}
          />
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
      </TouchableWithoutFeedback>
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
