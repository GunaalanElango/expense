import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useIsDrawerOpen } from "@react-navigation/drawer";
import { useSelector } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";

import Fab from "../components/Fab";
import Colors from "../../colors/colors";

const HomeScreen = (props) => {
  const account = useSelector((state) => state.account);

  const isDrawerOpen = useIsDrawerOpen();

  const fabClickHandler = () => {
    props.navigation.navigate("EditIncomeExpenseScreen", {});
  };

  let FAB = isDrawerOpen ? null : <Fab clicked={fabClickHandler} />;

  return (
    <View style={Styles.screen}>
      <View style={Styles.balanceContainer}>
        <Text style={Styles.balanceTitle}>Total Balance</Text>
        <Text style={Styles.balance}>
          <FontAwesome name="rupee" size={32} color="black" />
          {account.totalBalance}
        </Text>
      </View>

      <View style={Styles.listContainer}>
        <Text style={Styles.balanceTitle}>Activities</Text>
        {account.incomeAndExpenses.length <= 0 ? (
          <Text
            style={{
              ...Styles.balanceTitle,
              textAlign: "center",
              padding: 10,
              fontWeight: "normal",
            }}
          >
            No Activities so far
          </Text>
        ) : (
          <FlatList
            data={account.incomeAndExpenses}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  style={
                    item.type === "income"
                      ? Styles.incomeListItem
                      : Styles.expenseListItem
                  }
                  activeOpacity={0.8}
                  onPress={() =>
                    props.navigation.navigate("EditIncomeExpenseScreen", {
                      id: item.id,
                    })
                  }
                >
                  <View style={Styles.listTextContainer}>
                    <Text style={Styles.listText}>
                      <FontAwesome name="rupee" size={15} color="black" />
                      {item.amount}
                    </Text>
                    <Text style={Styles.listText}>{item.date}</Text>
                  </View>
                  <View style={Styles.listTextContainer}>
                    <Text style={Styles.listText}>{item.category}</Text>
                    <Text style={Styles.listText}>{item.date}</Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        )}
      </View>
      {FAB}
    </View>
  );
};

const Styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  balanceContainer: {
    alignItems: "flex-start",
    paddingTop: 20,
    paddingHorizontal: 24,
    borderBottomColor: "rgba(0,0,0,0.4)",
    borderBottomWidth: 1.5,
  },
  balanceTitle: {
    color: "#000000",
    fontSize: 20,
    fontWeight: "bold",
  },
  balance: {
    color: "#000000",
    fontSize: 35,
    fontWeight: "bold",
    paddingVertical: 15,
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  incomeListItem: {
    backgroundColor: Colors.primary,
    padding: 10,
    marginVertical: 8,
    borderRadius: 10,
  },
  expenseListItem: {
    backgroundColor: Colors.secondary,
    padding: 10,
    marginVertical: 8,
    borderRadius: 10,
  },
  listTextContainer: {
    flexDirection: "row",
    marginVertical: 5,
    justifyContent: "space-between",
    padding: 3,
  },
  listText: {
    fontSize: 18,
    color: "#000",
  },
});

export default HomeScreen;
