import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import ExpenseCategoryScreen from "../src/screens/category/ExpenseCategoryScreen";
import IncomeCategoryScreen from "../src/screens/category/IncomeCategoryScreen";

const TopTab = createMaterialTopTabNavigator();

const CategoryTopTabNavigator = () => {
  return (
    <TopTab.Navigator
      swipeEnabled={false}
      tabBarOptions={{
        activeTintColor: "white",
        inactiveTintColor: "rgba(0,0,0,0.2)",
        tabStyle: {
          backgroundColor: "salmon",
        },
        labelStyle: {
          fontSize: 17,
        },
      }}
    >
      <TopTab.Screen
        name="IncomeCategory"
        component={IncomeCategoryScreen}
        options={{ tabBarLabel: "Income" }}
      />
      <TopTab.Screen
        name="ExpenseCategory"
        options={{ tabBarLabel: "Expense" }}
        component={ExpenseCategoryScreen}
      />
    </TopTab.Navigator>
  );
};

export { CategoryTopTabNavigator };
