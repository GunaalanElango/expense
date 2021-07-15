import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import Colors from "../../colors/colors";
import { getDateByTimestamp } from "../../util/utilities";

const StatementList = ({ item, itemClick }) => {
  return (
    <TouchableOpacity
      style={Styles.statementListItem}
      activeOpacity={0.8}
      onPress={() => itemClick(item.id)}
    >
      <View style={Styles.listTextContainer}>
        <Text style={Styles.listText}>
          <FontAwesome name="rupee" size={17} color="black" />
          <Text style={{ fontWeight: "bold" }}>{item.amount}</Text>
        </Text>

        <Text style={Styles.listText}>
          {new Date(item.date).toDateString()}
        </Text>
      </View>
      <View style={Styles.listTextContainer}>
        <Text style={[Styles.listText, Styles.white]}>{item.category}</Text>

        <Text style={Styles.listText}>{getDateByTimestamp(item.date)}</Text>
      </View>
    </TouchableOpacity>
  );
};

const Styles = StyleSheet.create({
  statementListItem: {
    backgroundColor: Colors.pale,
    padding: 10,
    marginVertical: 8,
    borderRadius: 10,
  },
  listTextContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 3,
  },
  listText: {
    fontSize: 20,
    color: "#000",
  },
  white: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default StatementList;
