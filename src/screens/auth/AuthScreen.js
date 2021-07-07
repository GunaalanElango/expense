import React, { useEffect, useReducer, useCallback } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { Button } from "react-native-paper";
import { useDispatch } from "react-redux";

import * as authActions from "../../../store/actions/auth";
import Input from "../../components/Input";
import { FORM_INPUT_CHANGE, formReducer } from "../../../store/reducers/form";

const AuthScreen = (props) => {
  const dispatch = useDispatch();
  const isLoginScreen = props.route.params.login;

  useEffect(() => {
    props.navigation.setOptions({
      title: isLoginScreen ? "Login" : "Register",
    });
  });

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

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView>
        <View style={Styles.screen}>
          <Input
            label="Name"
            id="name"
            change={onValueChange}
            initialValue={formState.inputValues.name}
            initialValid={false}
            errorText={{
              required: "Name is required",
              nameInvalid: "Please type a valid name",
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
              required: "Mobile number is required",
              mobileNumberInvalid: "Please type a valid mobile number",
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
              required: "Password is required",
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
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const Styles = StyleSheet.create({
  screen: {
    flex: 1,
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
