import React, { useState } from "react";
import { FAB } from "react-native-paper";
import { StyleSheet } from "react-native";

const Fab = (props) => {
  const [open, setOpen] = useState(false);
  return (
    <FAB.Group
      style={Styles.fab}
      open={open}
      icon={open ? "close" : "plus"}
      actions={[
        {
          icon: "plus",
          label: "Add Income",
          onPress: () => {},
          small: false,
        },
        {
          icon: "minus",
          label: "Add Expense",
          onPress: () => {},
          small: false,
        },
      ]}
      onStateChange={({ open }) => setOpen(open)}
    />
  );
};

const Styles = StyleSheet.create({
  fab: {
    position: "absolute",
    right: 0,
    bottom: 50,
  },
});

export default Fab;
