import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { TextInput, Button, HelperText } from "react-native-paper";
import { useDispatch } from "react-redux";

import Colors from "../../../colors/colors";
import * as authActions from "../../../store/actions/auth";

let MobileNumberRegex = /^\d{10}$/;
let NameRegex = /^[a-zA-Z ]+$/;

const AuthScreen = (props) => {
  const dispatch = useDispatch();
  const isLoginScreen = props.route.params.login;
  // const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  const checkNameValidity = (value) => {
    return NameRegex.test(value);
  };

  const checkMobileNumberValidity = (value) => {
    return MobileNumberRegex.test(value);
  };

  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");

  const [nameError, setNameError] = useState(false);
  const [mobileNumberError, setMobileNumberError] = useState(false);
  const [disableBtn, setDisableBtn] = useState("inital");

  const onRegisterHandler = () => {};

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

  const onValueChangeHandler = (field, enteredValue) => {
    switch (field) {
      case "name":
        setName(enteredValue.trim());
        break;
      case "mobileNumber":
        setMobileNumberError(!checkMobileNumberValidity(enteredValue));
        setMobileNumber(enteredValue);
        break;
      case "password":
        setPassword(enteredValue);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    props.navigation.setOptions({
      headerStyle: {
        backgroundColor: Colors.primary,
      },
      headerTintColor: "#fff",
      headerTitleAlign: "center",
      title: isLoginScreen ? "Login" : "Register",
    });
  });

  return (
    <ScrollView style={Styles.screen}>
      <View style={{ paddingHorizontal: "5%" }}>
        {isLoginScreen ? null : (
          <View>
            <TextInput
              mode="flat"
              label="Name"
              outlineColor="#000"
              style={Styles.textInput}
              value={name}
              onChangeText={(enteredName) =>
                onValueChangeHandler("name", enteredName)
              }
              error={nameError}
            />
            <HelperText
              style={{ fontSize: 12, paddingVertical: 8 }}
              padding="none"
              type="error"
              visible={nameError}
            >
              Name should contain only letters and space
            </HelperText>
          </View>
        )}
        <View>
          <TextInput
            mode="flat"
            label="Mobile number"
            outlineColor="#000"
            style={Styles.textInput}
            value={mobileNumber}
            error={mobileNumberError}
            onChangeText={(enteredNumber) =>
              onValueChangeHandler("mobileNumber", enteredNumber)
            }
            keyboardType="numeric"
          />
          <HelperText
            style={{ fontSize: 12, paddingVertical: 8 }}
            padding="none"
            type="error"
            visible={mobileNumberError}
          >
            Number should be in 10 digit number
          </HelperText>
        </View>
        <View>
          <TextInput
            mode="flat"
            label="Password"
            outlineColor="#000"
            style={Styles.textInput}
            secureTextEntry={true}
            value={password}
            onChangeText={(enteredPassword) =>
              onValueChangeHandler("password", enteredPassword)
            }
            // right={
            //   <TextInput.Icon
            //     name="eye"
            //     onPress={() => setIsPasswordHidden((prevState) => !prevState)}
            //     color={Colors.secondary}
            //   />
            // }
          />
        </View>
        <View style={{ width: "100%", alignItems: "center", marginTop: 20 }}>
          <Button
            mode="contained"
            onPress={isLoginScreen ? onLoginHandler : onRegisterHandler}
          >
            {isLoginScreen ? "Login" : "Register"}
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

const Styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 10,
  },
  textInput: { backgroundColor: "#fff", fontSize: 16 },
});

export default AuthScreen;
