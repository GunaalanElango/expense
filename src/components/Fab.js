import React, { useState } from "react";
import { FAB } from "react-native-paper";
import { StyleSheet } from "react-native";

import Colors from "../../colors/colors";

const Fab = (props) => {
  const [open, setOpen] = useState(false);
  return (
    <FAB.Group
      style={Styles.fab}
      open={open}
      color="#fff"
      icon={open ? "close" : "plus"}
      actions={[
        {
          icon: "plus",
          label: "Add Income",
          onPress: () => {},
          color: Colors.primary,
        },
        {
          icon: "minus",
          label: "Add Expense",
          onPress: () => {
            setOpen(false);
            props.addExpense();
          },
          color: Colors.primary,
        },
      ]}
      onStateChange={({ open }) => setOpen(open)}
      visible={props.visible}
    />
  );
};

const Styles = StyleSheet.create({
  fab: {
    position: "absolute",
    right: 0,
    bottom: 0,
    padding: 5,
  },
});

export default Fab;
