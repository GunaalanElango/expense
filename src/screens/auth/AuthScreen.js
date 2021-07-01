import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { TextInput, Button, HelperText } from "react-native-paper";
import Colors from "../../../colors/colors";

let MobileNumberRegex = /^\d{10}$/;
let NameRegex = /^[a-zA-Z ]+$/;

const AuthScreen = (props) => {
  const isLoginScreen = props.route.params.login;
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");

  const [nameError, setNameError] = useState(false);

  const onValueChangeHandler = (field, enteredValue) => {
    switch (field) {
      case "name":
        if (!NameRegex.test(enteredValue) || name.length == 0) {
          setNameError(true);
        } else {
          setNameError(false);
        }
        setName(enteredValue.trim());
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
          <View style={Styles.textInputContainer}>
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
              Name is invalid
            </HelperText>
          </View>
        )}
        <View style={Styles.textInputContainer}>
          <TextInput
            mode="flat"
            label="Mobile number"
            outlineColor="#000"
            style={Styles.textInput}
          />
        </View>
        <View style={Styles.textInputContainer}>
          <TextInput
            mode="flat"
            label="Password"
            outlineColor="#000"
            style={Styles.textInput}
            secureTextEntry={isPasswordHidden}
            right={
              <TextInput.Icon
                name="eye"
                onPress={() => setIsPasswordHidden((prevState) => !prevState)}
                color={Colors.secondary}
              />
            }
          />
        </View>
        <View style={{ width: "100%", alignItems: "center" }}>
          <Button mode="contained" onPress={() => {}}>
            Submit
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
  textInputContainer: {
    marginVertical: 10,
  },
  textInput: { backgroundColor: "#fff", fontSize: 16 },
});

export default AuthScreen;
