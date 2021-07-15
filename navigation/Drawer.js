import React from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { View, Image, StyleSheet, Text } from "react-native";
import { useDispatch } from "react-redux";
import * as authActions from "../store/actions/auth";

import HomeScreen from "../src/screens/HomeScreen";
import Colors from "../colors/colors";
import { CategoryTopTabNavigator } from "./TopTab";

const Drawer = createDrawerNavigator();

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
          elevation: 0,
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

export { HomeDrawerNavigator };
