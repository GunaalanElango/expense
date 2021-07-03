import React, { useState, useEffect } from "react";
import { TextInput, View, StyleSheet } from "react-native";

import {} from "react-native-paper";

const OTPScreen = () => {
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
      <View style={Styles.textInputContainer}>{renderInputs()}</View>
    </View>
  );
};

const Styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
  },
  textInputContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  textInput: {
    borderBottomColor: "rgba(0,0,0,0.25)",
    borderBottomWidth: 1,
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 5,
    textAlign: "center",
    width: "10%",
  },
});

export default OTPScreen;
