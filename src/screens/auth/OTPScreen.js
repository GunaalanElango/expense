import React, { useState, useEffect } from "react";
import { TextInput, View, StyleSheet, Text } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Button } from "react-native-paper";
import Colors from "../../../colors/colors";
import { HeaderBackButton } from "@react-navigation/stack";
import { useDispatch } from "react-redux";

import * as authActions from "../../../store/actions/auth";

const OTPScreen = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    props.navigation.setOptions({
      headerLeft: (p) => (
        <HeaderBackButton {...p} onPress={() => props.navigation.popToTop()} />
      ),
    });
  });

  const [otp, setOtp] = useState([]);
  const [otpTextInput] = useState([]);

  useEffect(() => {
    otpTextInput[0].focus();
  }, []);

  const focusNext = (i, number) => {
    let otpInputsLength = otpTextInput.length - 1;
    if (i < otpInputsLength && number) {
      otpTextInput[i + 1].focus();
    }

    if (i == otpInputsLength) {
      otpTextInput[i].blur();
    }

    setOtp((prevOtp) => {
      prevOtp[i] = number;
      return [...prevOtp];
    });
  };

  const focusPrevious = (key, index) => {
    if (key == "Backspace" && index != 0) {
      otpTextInput[index - 1].focus();
    }
  };

  const renderInputs = () => {
    const inputs = Array(4).fill(0);
    const text = inputs.map((input, index) => {
      return (
        <TextInput
          key={index.toString()}
          style={Styles.textInput}
          keyboardType="numeric"
          onChangeText={(enteredNumber) => focusNext(index, enteredNumber)}
          ref={(ref) => (otpTextInput[index] = ref)}
          onKeyPress={(event) => focusPrevious(event.nativeEvent.key, index)}
          maxLength={1}
        />
      );
    });
    return text;
  };

  return (
    <View style={Styles.screen}>
      <View style={Styles.imageContainer}>
        <SimpleLineIcons name="screen-smartphone" size={200} color="salmon" />
      </View>
      <View style={Styles.OTPContainer}>
        <Text style={Styles.heading}>OTP Verification</Text>
        <Text style={Styles.subHeading}>
          Enter the OTP sent to +91 {props.route.params.mobileNumber}
        </Text>
        <View style={Styles.textInputContainer}>{renderInputs()}</View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={Styles.subHeading}>Don't receive the OTP?</Text>
          <Button
            labelStyle={{ fontWeight: "bold" }}
            style={{ paddingHorizontal: 5 }}
            onPress={() => {}}
          >
            RESEND OTP
          </Button>
        </View>
        <Button
          mode="contained"
          color={Colors.secondary}
          labelStyle={Styles.submitBtnText}
          style={Styles.submitBtn}
          onPress={() =>
            dispatch(authActions.login({ name: "Gunaalan", mobileNumber: "" }))
          }
        >
          Verify & Proceed
        </Button>
      </View>
    </View>
  );
};

const Styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
  },
  imageContainer: { alignItems: "center", marginVertical: 15 },
  OTPContainer: { flex: 1, alignItems: "center" },
  textInputContainer: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 30,
    marginBottom: 20,
  },
  textInput: {
    borderBottomColor: "rgba(0,0,0,0.3)",
    borderBottomWidth: 2,
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 5,
    textAlign: "center",
    width: "10%",
  },
  heading: {
    marginVertical: 20,
    fontSize: 23,
    fontWeight: "bold",
  },
  subHeading: {
    fontSize: 15,
    fontWeight: "bold",
    color: "rgba(0,0,0,0.3)",
  },
  submitBtnText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
    marginVertical: 15,
    width: "80%",
  },
  submitBtn: {
    borderRadius: 10,
    marginTop: 20,
  },
});

export default OTPScreen;
