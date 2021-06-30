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

import HomeScreen from "../src/screens/HomeScreen";
import Colors from "../colors/colors";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const defaultScreenOptions = {
  headerStyle: {
    backgroundColor: Colors.primary,
  },
  headerTintColor: "#fff",
  headerTitleStyle: {
    fontSize: 18,
  },
};

const HomeStackScreen = () => {
  return (
    <Stack.Navigator screenOptions={defaultScreenOptions}>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ title: "Welcome Gunaalan!" }}
      />
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

const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={defaultScreenOptions}>
      <Stack.Screen
        name="HomeTab"
        component={HomeTabNavigator}
        options={{ title: "Welcome Gunaalan!", headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const CustomDrawerComponent = (props) => {
  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{
        flex: 1,
        justifyContent: "space-between",
      }}
    >
      <DrawerItemList {...props} />
      <DrawerItem
        label="Logout"
        inactiveTintColor="#000"
        inactiveBackgroundColor="rgba(0,0,0,0.05)"
        activeTintColor={Colors.primary}
        activeBackgroundColor="#fff"
        pressColor="#fff"
        focused={false}
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
    </DrawerContentScrollView>
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
    >
      <Drawer.Screen
        name="Home"
        component={MainStackNavigator}
        options={{
          drawerIcon: (props) => {
            return (
              <Ionicons
                name="ios-home-outline"
                size={25}
                color={Colors.primary}
              />
            );
          },
        }}
      />
    </Drawer.Navigator>
  );
};

export default MainDrawerNavigator;
