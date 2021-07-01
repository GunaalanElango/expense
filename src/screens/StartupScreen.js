import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { Button } from "react-native-paper";
import Colors from "../../colors/colors";

const StartupScreen = (props) => {
  return (
    <View style={Styles.screen}>
      <View style={Styles.imageContainer}>
        <Image
          source={require("../../assets/save-money.png")}
          resizeMode="stretch"
          style={{ width: 70, height: 120 }}
        />
      </View>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Button
          color="#fff"
          mode="contained"
          style={Styles.button}
          labelStyle={Styles.buttonLabel}
        >
          how it works
        </Button>
        <Button
          color="#fff"
          uppercase={false}
          labelStyle={{ fontWeight: "bold", fontSize: 15 }}
        >
          Create a account
        </Button>
        <Button
          color="#fff"
          mode="contained"
          style={Styles.button}
          labelStyle={Styles.buttonLabel}
          onPress={() => {}}
        >
          login
        </Button>
      </View>
    </View>
  );
};

const Styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  imageContainer: {
    height: "65%",
    width: "100%",
    backgroundColor: "white",
    transform: [{ scaleX: 2 }],
    borderBottomStartRadius: 300,
    borderBottomEndRadius: 300,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: "80%",
    elevation: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  buttonLabel: {
    fontSize: 15,
    fontWeight: "bold",
    marginVertical: 15,
  },
});

export default StartupScreen;
