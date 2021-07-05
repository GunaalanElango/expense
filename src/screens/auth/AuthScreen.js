import React, { useEffect, useReducer } from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { useDispatch } from "react-redux";

import * as authActions from "../../../store/actions/auth";
import Input from "../../components/Input";

const formReducer = (state, action) => {
  switch (action.type) {
    case "FORM_INPUT_CHANGE":
      return {
        inputValues: {
          ...state.inputValues,
          [action.id]: action.value,
        },
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
  });

  const dispatch = useDispatch();
  const isLoginScreen = props.route.params.login;

  const onRegisterHandler = () => {
    props.navigation.navigate("OTPScreen", {
      mobileNumber,
    });
  };

  const onLoginHandler = () => {
    if (!checkMobileNumberValidity(mobileNumber)) {
      setMobileNumberError(true);
      return;
    }
    dispatch(
      authActions.login({
        id: Date.now(),
        name,
        mobileNumber,
        password,
      })
    );
  };

  const onValueChange = (id, value) => {
    dispatchFormState({
      type: "FORM_INPUT_CHANGE",
      id,
      value,
    });
  };

  useEffect(() => {
    props.navigation.setOptions({
      title: isLoginScreen ? "Login" : "Register",
    });
  });

  return (
    <View style={Styles.screen}>
      <Input label="Name" id="name" change={onValueChange} />
      <Input
        label="Mobile Number"
        id="mobileNumber"
        keyboardType="numeric"
        change={onValueChange}
      />
      <Input label="Password" id="password" change={onValueChange} />

      <View style={{ width: "100%", alignItems: "center", marginTop: 20 }}>
        <Button
          mode="contained"
          disabled={!formState.formIsValid}
          onPress={isLoginScreen ? onLoginHandler : onRegisterHandler}
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
    paddingHorizontal: "10%",
  },
});

export default AuthScreen;
