import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useIsDrawerOpen } from "@react-navigation/drawer";
import { useSelector } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";

import Fab from "../components/Fab";
import StatementList from "../components/StatementList";

const HomeScreen = (props) => {
  const account = useSelector((state) => state.account);

  const isDrawerOpen = useIsDrawerOpen();

  const fabClickHandler = () => {
    props.navigation.navigate("EditStatementScreen", {});
  };

  const onStatementClickHandler = (id) => {
    props.navigation.navigate("EditStatementScreen", {
      id,
    });
  };

  let FAB = isDrawerOpen ? null : <Fab clicked={fabClickHandler} />;

  return (
    <View style={Styles.screen}>
      <View style={Styles.balanceContainer}>
        <Text style={Styles.balanceTitle}>Total Balance</Text>
        <Text style={Styles.balance}>
          <FontAwesome name="rupee" size={33} color="black" />
          {account.totalBalance}
        </Text>
      </View>

      {account.statements.length <= 0 ? null : (
        <View style={Styles.listContainer}>
          <Text style={Styles.balanceTitle}>Activities</Text>

          <FlatList
            data={account.statements}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              return (
                <StatementList
                  item={item}
                  itemClick={onStatementClickHandler}
                />
              );
            }}
          />
        </View>
      )}
      {FAB}
    </View>
  );
};

const Styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
  },
  balanceContainer: {
    alignItems: "flex-start",
  },
  balanceTitle: {
    color: "#000000",
    fontSize: 25,
  },
  balance: {
    color: "#000000",
    fontSize: 35,
    fontWeight: "bold",
  },
  listContainer: {
    flex: 1,
    paddingTop: 10,
  },
});

export default HomeScreen;
