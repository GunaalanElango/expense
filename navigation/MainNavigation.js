import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { View, Image } from "react-native";
import { Text } from "react-native-paper";

import HomeScreen from "../src/screens/HomeScreen";
import AddIncomeScreen from "../src/screens/AddIncomeScreen";
import Colors from "../colors/colors";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const HomeTabNavigator = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: Colors.primary,
        safeAreaInsets: {
          bottom: 5,
          right: 0,
          left: 0,
        },
        labelStyle: {
          fontSize: 14,
        },
      }}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarIcon: () => (
            <Ionicons
              name="ios-home-outline"
              size={25}
              color={Colors.primary}
            />
          ),
          title: "Home",
        }}
      />
    </Tab.Navigator>
  );
};

const CustomDrawerComponent = (props) => {
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 10,
            borderBottomColor: "rgba(0,0,0,0.1)",
            borderBottomWidth: 2,
            paddingBottom: 15,
            marginHorizontal: 10,
          }}
        >
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            Welcome Gunaalan !
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
        inactiveTintColor="#000"
        inactiveBackgroundColor="rgba(0,0,0,0.05)"
        pressColor={Colors.primary}
        labelStyle={{
          fontSize: 15,
          fontWeight: "bold",
        }}
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
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerComponent {...props} />}
      drawerContentOptions={{
        activeTintColor: Colors.primary,
        activeBackgroundColor: "#fff",
        inactiveTintColor: "black",
        inactiveBackgroundColor: "#fff",
        labelStyle: {
          fontSize: 15,
          fontWeight: "bold",
        },
      }}
      screenOptions={{
        swipeEnabled: false,
        headerShown: true,
        headerStyle: {
          backgroundColor: Colors.primary,
          height: 70,
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontSize: 18,
        },
      }}
    >
      <Drawer.Screen
        name="HomeScreen"
        component={HomeTabNavigator}
        options={{
          title: "Welcome Gunaalan !",
          drawerIcon: (props) => {
            return (
              <Ionicons name="ios-home-outline" size={25} color={props.color} />
            );
          },
          drawerLabel: "Home",
        }}
      />
      <Drawer.Screen
        name="AddIncomeScreen"
        component={AddIncomeScreen}
        options={{
          title: "Add Income",
          drawerLabel: "Add Income",
          drawerIcon: (props) => {
            return (
              <Ionicons
                name="md-add-circle-outline"
                size={25}
                color={props.color}
              />
            );
          },
        }}
      />
    </Drawer.Navigator>
  );
};

export default MainDrawerNavigator;
