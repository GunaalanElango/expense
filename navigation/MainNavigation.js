import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { View, Image, StyleSheet, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as authActions from "../store/actions/auth";

import HomeScreen from "../src/screens/HomeScreen";
import AuthScreen from "../src/screens/auth/AuthScreen";
import StartupScreen from "../src/screens/StartupScreen";
import Colors from "../colors/colors";
import OTPScreen from "../src/screens/auth/OTPScreen";
import EditExpenseScreen from "../src/screens/EditExpenseScreen";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="EditExpenseScreen" component={EditExpenseScreen} />
    </Stack.Navigator>
  );
};

const CustomDrawerComponent = (props) => {
  const authenticatedUser = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={Styles.drawerHeaderStyle}>
          <Text style={{ fontSize: 15 }}>
            Welcome {authenticatedUser.name}!
          </Text>
          <Image
            source={require("../assets/asset-management.png")}
            style={{ width: 60, height: 60 }}
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

const MainDrawerNavigator = () => {
  const authenticatedUser = useSelector((state) => state.auth.user);

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
        name="HomeStackScreen"
        component={HomeStackNavigator}
        options={{
          title: `Welcome ${authenticatedUser.name}!`,
          drawerIcon: (props) => {
            return (
              <Ionicons name="ios-home-outline" size={25} color={props.color} />
            );
          },
          drawerLabel: "Home",
        }}
      />
    </Drawer.Navigator>
  );
};

export const StartupNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary },
        headerTintColor: "#fff",
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="StartupScreen"
        component={StartupScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="AuthScreen" component={AuthScreen} />
      <Stack.Screen
        name="OTPScreen"
        component={OTPScreen}
        options={{
          headerStyle: { backgroundColor: "#fff", elevation: 0 },
          headerTintColor: "#000",
          title: "",
        }}
      />
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

export default MainDrawerNavigator;
