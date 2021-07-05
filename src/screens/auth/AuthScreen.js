import React, { useEffect, useReducer, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { useDispatch } from "react-redux";

import * as authActions from "../../../store/actions/auth";
import Input from "../../components/Input";

const FORM_INPUT_CHANGE = "FORM_INPUT_CHANGE";

const formReducer = (state, action) => {
  switch (action.type) {
    case FORM_INPUT_CHANGE:
      const updatedValues = {
        ...state.inputValues,
        [action.id]: action.value,
      };

      const updatedValidity = {
        ...state.inputValidity,
        [action.id]: action.isValid,
      };

      let updatedFromIsValid = false;
      for (const key in updatedValidity) {
        if (!updatedValidity[key]) {
          updatedFromIsValid = false;
          break;
        } else {
          updatedFromIsValid = true;
        }
      }

      return {
        inputValues: updatedValues,
        inputValidity: updatedValidity,
        formIsValid: updatedFromIsValid,
      };
    default:
      return state;
  }
};

const AuthScreen = (props) => {
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      name: "",
      mobileNumber: "",
      password: "",
    },
    inputValidity: {
      name: false,
      mobileNumber: false,
      password: false,
    },
    formIsValid: false,
  });

  const dispatch = useDispatch();
  const isLoginScreen = props.route.params.login;

  const onSubmitHandler = () => {
    if (isLoginScreen) {
      dispatch(
        authActions.login({
          id: Date.now(),
          name: formState.inputValues.name,
          mobileNumber: formState.inputValues.mobileNumber,
          password: formState.inputValues.password,
        })
      );
    } else {
      props.navigation.navigate("OTPScreen", {
        mobileNumber: formState.inputValues.mobileNumber,
      });
    }
  };

  const onValueChange = useCallback(
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
      title: isLoginScreen ? "Login" : "Register",
    });
  });

  return (
    <View style={Styles.screen}>
      <Input
        label="Name"
        id="name"
        change={onValueChange}
        initialValue={formState.inputValues.name}
        initialValid={false}
        errorText={{
          required: "name is required",
          nameInvalid: "please type a valid name",
        }}
        required
        name
      />
      <Input
        label="Mobile Number"
        id="mobileNumber"
        keyboardType="numeric"
        change={onValueChange}
        initialValue={formState.inputValues.mobileNumber}
        initialValid={false}
        errorText={{
          required: "mobile number is required",
          mobileNumberInvalid: "please type a valid mobile number",
        }}
        required
        mobileNumber
      />
      <Input
        label="Password"
        id="password"
        change={onValueChange}
        initialValue={formState.inputValues.password}
        initialValid={false}
        errorText={{
          required: "password is required",
        }}
        required
        secureTextEntry={true}
      />

      <View style={Styles.submitButtonContainer}>
        <Button
          mode="contained"
          disabled={!formState.formIsValid}
          onPress={onSubmitHandler}
        >
          {isLoginScreen ? "Login" : "Register"}
        </Button>
      </View>
    </View>
  );
};

const Styles = StyleSheet.create({
  screen: {
    paddingTop: 10,
    paddingHorizontal: "5%",
  },
  submitButtonContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
});

export default AuthScreen;
