import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { View, Image, StyleSheet, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as authActions from "../store/actions/auth";

import HomeScreen from "../src/screens/HomeScreen";
import AuthScreen from "../src/screens/auth/AuthScreen";
import EditExpenseScreen from "../src/screens/EditExpenseScreen";
import StartupScreen from "../src/screens/StartupScreen";
import OTPScreen from "../src/screens/auth/OTPScreen";
import EditIncomeScreen from "../src/screens/EditIncomeScreen";
import EditCategoryScreen from "../src/screens/EditCategoryScreen";
import Colors from "../colors/colors";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const TopTab = createMaterialTopTabNavigator();

const defaultStackScreenOptions = {
  headerStyle: { backgroundColor: Colors.primary },
  headerTintColor: "#ffffff",
  headerTitleAlign: "left",
};

export const StartupNavigator = () => {
  return (
    <Stack.Navigator screenOptions={defaultStackScreenOptions}>
      <Stack.Screen
        name="StartupScreen"
        component={StartupScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="AuthScreen" component={AuthScreen} />
      <Stack.Screen
        name="OTPScreen"
        component={OTPScreen}
        options={{
          headerStyle: { backgroundColor: "#ffffff", elevation: 0 },
          headerTintColor: "#000",
          title: "",
        }}
      />
    </Stack.Navigator>
  );
};

const CategoryTopTabNavigator = () => {
  return (
    <TopTab.Navigator
      swipeEnabled={false}
      tabBarOptions={{
        activeTintColor: Colors.primary,
        indicatorStyle: {
          backgroundColor: Colors.primary,
        },
      }}
    >
      <TopTab.Screen name="IncomeCategory" options={{ tabBarLabel: "Income" }}>
        {(props) => <EditCategoryScreen type="income" {...props} />}
      </TopTab.Screen>
      <TopTab.Screen
        name="ExpenseCategory"
        options={{ tabBarLabel: "Expense" }}
      >
        {(props) => <EditCategoryScreen type="expense" {...props} />}
      </TopTab.Screen>
    </TopTab.Navigator>
  );
};

const CustomDrawerComponent = (props) => {
  const dispatch = useDispatch();

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={Styles.drawerHeaderStyle}>
          <Text style={{ fontSize: 15 }}>Welcome Gunaalan!</Text>
          <Image
            source={require("../assets/wealth.png")}
            style={{ width: 100, height: 100 }}
          />
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <DrawerItem
        label="Logout"
        inactiveBackgroundColor="rgba(0,0,0,0.05)"
        labelStyle={{
          fontSize: 15,
        }}
        onPress={() => dispatch(authActions.logout())}
        icon={(props) => (
          <Ionicons
            name="log-out-outline"
            size={props.size}
            color={props.color}
          />
        )}
      />
    </View>
  );
};

const HomeDrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerComponent {...props} />}
      drawerContentOptions={{
        activeTintColor: Colors.primary,
        inactiveTintColor: "#000000",
        activeBackgroundColor: "#fff",
        inactiveBackgroundColor: "#fff",
        labelStyle: {
          fontSize: 15,
        },
      }}
      screenOptions={{
        swipeEnabled: false,
        headerShown: true,
        headerStyle: {
          backgroundColor: Colors.primary,
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontSize: 17,
        },
      }}
    >
      <Drawer.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: "Home",
          drawerIcon: (props) => {
            return (
              <Ionicons name="ios-home-outline" size={25} color={props.color} />
            );
          },
          drawerLabel: "Home",
        }}
      />
      <Drawer.Screen
        name="EditCategoryScreen"
        component={CategoryTopTabNavigator}
        options={{
          title: "Category",
          drawerIcon: (props) => {
            return (
              <MaterialIcons name="category" size={25} color={props.color} />
            );
          },
          drawerLabel: "Category",
        }}
      />
    </Drawer.Navigator>
  );
};

const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={defaultStackScreenOptions}>
      <Stack.Screen
        name="HomeDrawer"
        component={HomeDrawerNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="EditExpenseScreen" component={EditExpenseScreen} />
      <Stack.Screen name="EditIncomeScreen" component={EditIncomeScreen} />
    </Stack.Navigator>
  );
};

const Styles = StyleSheet.create({
  drawerHeaderStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderBottomColor: "rgba(0,0,0,0.5)",
    borderBottomWidth: 1,
  },
});

export default MainStackNavigator;
