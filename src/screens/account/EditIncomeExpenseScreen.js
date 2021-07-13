import React, { useEffect, useReducer, useCallback, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-native-paper";

import Input from "../../components/Input";
import AccountActions from "../../../store/actions/account";
import { formReducer, FORM_INPUT_CHANGE } from "../../../store/reducers/form";
import RadioButton from "../../components/RadioButton";
import { initCaps } from "../../../util/utilities";

const EditIncomeExpenseScreen = (props) => {
  const dispatch = useDispatch();

  const editData = useSelector((state) =>
    state.account.incomeAndExpenses.find(
      (incExp) => incExp.id == props.route.params.id
    )
  );

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      amount: editData ? editData.amount : "",
      description: editData ? editData.description : "",
      category: editData ? editData.category : "",
    },
    inputValidity: {
      amount: editData ? true : false,
      description: editData ? true : false,
      category: editData ? true : false,
    },
    formIsValid: !!editData,
  });
  const [type, setType] = useState(editData ? editData.type : "expense");
  const [title, setTitle] = useState("");

  useEffect(() => {
    let firstNameT = "",
      lastnameT = "";

    if (editData) {
      firstNameT = "Update";
    } else {
      firstNameT = "Add";
    }
    lastnameT = initCaps(type);

    setTitle(firstNameT + " " + lastnameT);
  }, [type]);

  useEffect(() => {
    props.navigation.setOptions({
      title: title,
    });
  });

  const onTypeChange = (changedType) => {
    setType(changedType);
  };

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

  const onSubmitHandler = () => {
    if (editData) {
      dispatch(
        AccountActions.updateIncomeExpense(
          editData.id,
          formState.inputValues.amount,
          formState.inputValues.category,
          formState.inputValues.description
        )
      );
    } else {
      dispatch(
        AccountActions.addIncomeExpense(
          type,
          formState.inputValues.amount,
          formState.inputValues.category,
          formState.inputValues.description
        )
      );
    }
    props.navigation.goBack();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={Styles.screen}>
      <View style={Styles.container}>
        {editData ? null : (
          <RadioButton onchange={onTypeChange} initialSelected={type} />
        )}

        <Input
          id="category"
          label="Category"
          initialValue={formState.inputValues.category}
          initialValid={!!editData}
          change={onValueChangeHandler}
          required
        />

        <Input
          id="amount"
          label="Amount"
          keyboardType="numeric"
          initialValue={formState.inputValues.amount}
          initialValid={!!editData}
          change={onValueChangeHandler}
          required
        />

        <Input
          id="description"
          label="Description"
          multiline={true}
          numberOfLines={3}
          initialValue={formState.inputValues.description}
          initialValid={!!editData}
          change={onValueChangeHandler}
          required
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
  );
};

const Styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 24,
  },
  submitButtonContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
});

export default EditIncomeExpenseScreen;
