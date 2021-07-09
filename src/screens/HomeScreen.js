import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import { useIsDrawerOpen } from "@react-navigation/drawer";
import { useFocusEffect } from "@react-navigation/native";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";

import Fab from "../components/Fab";
import Colors from "../../colors/colors";

const HomeScreen = (props) => {
  const [showItems, setShowItems] = useState(false);

  const isDrawerOpen = useIsDrawerOpen();

  useFocusEffect(() => {
    return () => {
      if (showItems) {
        setShowItems(false);
      }
    };
  });

  let FAB = isDrawerOpen ? null : (
    <Fab
      showItems={showItems}
      clicked={() => setShowItems((prev) => !prev)}
      items={[
        {
          label: "Add Income",
          icon: <MaterialIcons name="add" size={24} color={Colors.primary} />,
          clicked: () => props.navigation.navigate("EditIncomeScreen"),
        },
        {
          label: "Add Expense",
          icon: <AntDesign name="minus" size={24} color={Colors.primary} />,
          clicked: () =>
            props.navigation.navigate("EditExpenseScreen", { edit: false }),
        },
      ]}
    />
  );

  return (
    <View style={Styles.screen}>
      <Text>HomeScreen</Text>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => setShowItems(false)}
        style={{
          height: "100%",
          width: "100%",
          position: "absolute",
          zIndex: 100,
          backgroundColor: showItems ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0.05)",
        }}
      >
        {FAB}
      </TouchableOpacity>
    </View>
  );
};

const Styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomeScreen;
