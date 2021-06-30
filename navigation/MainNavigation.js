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
import { View, SafeAreaView, Image, Text } from "react-native";
import { IconButton } from "react-native-paper";

import HomeScreen from "../src/screens/HomeScreen";
import AddIncomeScreen from "../src/screens/AddIncomeScreen";
import Colors from "../colors/colors";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const defaultScreenOptions = {
  headerStyle: {
    backgroundColor: Colors.primary,
    height: 80,
  },
  headerTintColor: "#fff",
  headerTitleStyle: {
    fontSize: 18,
  },
};

const HomeStackScreen = (props) => {
  return (
    <Stack.Navigator screenOptions={defaultScreenOptions}>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerTitle: () => (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <IconButton
                icon="menu"
                color="#fff"
                size={25}
                onPress={() => props.navigation.toggleDrawer()}
              />
              <Text style={{ fontSize: 18, color: "#fff" }}>
                Welcome Gunaalan !
              </Text>
            </View>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const AddIncomeStackScreen = (props) => {
  return (
    <Stack.Navigator screenOptions={defaultScreenOptions}>
      <Stack.Screen name="AddIncomeScreen" component={AddIncomeScreen} />
    </Stack.Navigator>
  );
};

const HomeTabNavigator = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: Colors.primary,
        labelStyle: {
          fontSize: 12,
        },
      }}
    >
      <Tab.Screen
        name="HomeStackScreen"
        component={HomeStackScreen}
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
            justifyContent: "space-around",
            alignItems: "center",
            marginTop: 10,
            borderBottomColor: "rgba(0,0,0,0.1)",
            borderBottomWidth: 2,
            paddingBottom: 15,
            marginHorizontal: 5,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            Welcome Gunaalan!
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
      }}
    >
      <Drawer.Screen
        name="HomeTab"
        component={HomeTabNavigator}
        options={{
          drawerIcon: (props) => {
            return (
              <Ionicons name="ios-home-outline" size={25} color={props.color} />
            );
          },
          drawerLabel: "Home",
        }}
      />
      <Drawer.Screen
        name="AddIncomeStackScreen"
        component={AddIncomeStackScreen}
        options={{
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
